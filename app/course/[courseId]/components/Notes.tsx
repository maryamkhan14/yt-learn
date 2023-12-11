"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trpc } from "@/trpc/Provider";
import { useReactPlayerStore } from "../../../hooks/useReactPlayerStore";
import { useParams } from "next/navigation";
import BasicLoader from "@/components/loader/BasicLoader";
import { useMemo } from "react";
import { type RouterOutputs } from "@/lib/api";
import { type Note } from "@prisma/client";
import { toTimestamp } from "@/lib/time";
type Notes = RouterOutputs["notes"]["getByLessonId"];
function buildNotesMap(notes: Notes, margin: number) {
  const notesMap = new Map<number, string[]>();
  Object.keys(notes).map((timestamp) => {
    for (
      let second = parseInt(timestamp);
      second < parseInt(timestamp) + margin;
      second++
    ) {
      if (notesMap.has(second)) {
        notesMap.set(second, [...notesMap.get(second)!, timestamp]);
      } else {
        notesMap.set(second, [timestamp]);
      }
    }
  });
  return notesMap; // Maybe use a reducer instead later?
}
function SingleNote({ note }: { note: Note }) {
  return (
    <article className="my-8 flex flex-col rounded first:mt-0 last:mb-0 md:my-4 md:flex-row md:justify-between ">
      <p className="m-0 bg-slate-50 p-4 text-lg text-slate-700 md:w-full ">
        {note.note}
      </p>
      <p className="order-first m-0 flex items-center justify-center bg-slate-900 text-center md:order-none md:w-1/12">
        {toTimestamp(note.time)}
      </p>
    </article>
  );
}

function NoteDisplay({ notes }: { notes: Notes }) {
  const time = useReactPlayerStore((state) => state.time);
  const notesMap = useMemo(() => buildNotesMap(notes, 3), [notes]);
  const noteTimestamps = useMemo(() => {
    return JSON.stringify(notesMap.get(time));
  }, [notesMap, time]);
  const currentNotes = useMemo(() => {
    if (noteTimestamps) {
      const noteTimestampArr = JSON.parse(noteTimestamps) as string[];
      return noteTimestampArr.reduce(
        (acc: Note[], timestamp) => [...acc, ...notes[timestamp]!],
        [],
      );
    }
    return [];
  }, [notes, noteTimestamps]);

  return (
    <ScrollArea
      className={`scroll mt-4 w-full rounded ${
        currentNotes.length > 2 ? "h-48" : "h-32"
      }`}
    >
      {currentNotes.map((note) => (
        <SingleNote key={note.id} note={note} />
      ))}
    </ScrollArea>
  );
}
function Notes() {
  const { lessonId } = useParams();
  const {
    data: notes,
    status,
    error,
  } = trpc.notes.getByLessonId.useQuery(
    {
      lessonId: lessonId as string,
    },
    {
      retry: 0,
    },
  );
  if (status === "loading") {
    return (
      <BasicLoader
        title="Fetching notes"
        desc="Gathering all the notes at this timestamp"
        loaderStyles="self-center justify-self-center"
      />
    );
  }
  if (error) {
    return <p>Failed to fetch notes for this lesson.</p>;
  }
  if (!notes || !Object.keys(notes).length) {
    return <p>No notes yet!</p>;
  }
  return <NoteDisplay notes={notes} />;
}

export default Notes;
