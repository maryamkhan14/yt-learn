"use client";
import { memo, useEffect } from "react";
import { type Lesson } from "../schema";
import { toSeconds, toTimestamp } from "../../../../lib/time";
import LessonActions from "./LessonActions";
import { useDrag, useDrop } from "react-dnd";
import {
  type FieldValues,
  useFormContext,
  type UseFieldArrayRemove,
  type UseFieldArrayInsert,
  type UseFieldArrayMove,
} from "react-hook-form";
import Input from "@/components/Input";
import { useRef } from "react";

type LessonProps = {
  id: number;
  insert: UseFieldArrayInsert<FieldValues, "lessons">;
  remove: UseFieldArrayRemove;
  move: UseFieldArrayMove;
  maxLength: number;
};
type Item = {
  id: number;
};
const Lesson = memo(function Lesson({
  id,
  insert,
  remove,
  move,
  maxLength,
}: LessonProps) {
  const dragRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { watch, setValue } = useFormContext();
  const startTime = toSeconds(watch(`lessons[${id}].start`) as string);
  const endTime = toSeconds(watch(`lessons[${id}].end`) as string);
  function updateStartValue(toUpdate: number) {
    const lessons: Lesson[] = watch("lessons") as Lesson[];
    if (toUpdate >= lessons.length) return;
    if (toUpdate === 0) {
      setValue(`lessons[${toUpdate}].start`, "00:00:00");
    } else {
      const prevEndTimestamp = lessons[toUpdate - 1]!.end;
      const prevEndSeconds = toSeconds(prevEndTimestamp);
      if (startTime != prevEndSeconds + 1)
        setValue(
          `lessons[${toUpdate}].start`,
          toTimestamp(Math.min(prevEndSeconds + 1, maxLength)),
        );
    }
  }
  function updateStartValues(draggedId: number, id: number) {
    if (draggedId == id) return;
    const first = Math.min(draggedId, id);
    const second = Math.max(draggedId, id);
    updateStartValue(first);
    updateStartValue(second);
  }
  const [{ handlerId, isDragging }, drag, preview] = useDrag(() => ({
    type: "LESSON",
    item: { id },
    collect: (monitor) => {
      const result = {
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      };
      return result;
    },
    end: (item, monitor) => {
      const { id: droppedId } = item;
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        move(droppedId, id);
      }
    },
  }));

  const [, drop] = useDrop(() => ({
    accept: "LESSON",
    hover: (item: Item, monitor) => {
      const { id: draggedId } = item;
      if (!previewRef.current) {
        return;
      }
      const hoverId = id;
      const hoverBoundingRect = previewRef.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (draggedId < hoverId && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (draggedId > hoverId && hoverClientY > hoverMiddleY) {
        return;
      }
      move(draggedId, id);
      updateStartValues(draggedId, id);
    },
  }));

  useEffect(() => {
    updateStartValue(id + 1);
  }, [endTime]);

  drag(dragRef);
  drop(preview(previewRef));
  return (
    <div
      ref={previewRef}
      className={`my-3 flex w-full flex-col justify-evenly gap-3 rounded-lg border border-slate-50 p-4 md:flex-row ${
        isDragging ? "opacity-0" : "opacity-1"
      }`}
      data-handler-id={handlerId}
    >
      <div ref={dragRef} className="hidden self-center text-4xl md:flex">
        <i className="ri-draggable"></i>
      </div>
      <Input<Lesson>
        displayName="Start"
        name={`lessons[${id}].start`}
        type="numeric"
        inputMode="numeric"
        containerStyles="md:w-1/6"
        inputStyles="w-full rounded-lg border-4 border-opacity-0 px-4 py-3 text-lg outline-none cursor-not-allowed bg-gray-300 text-gray-400"
        maxLength={25}
        defaultValue={startTime}
        readOnly={true}
      ></Input>
      <Input<Lesson>
        displayName="End"
        name={`lessons[${id}].end`}
        type="numeric"
        inputMode="numeric"
        containerStyles="md:w-1/6"
        inputStyles="focus:bg-white"
        maxLength={25}
        placeholder="00:00:01 - will be replaced by YT vid's length"
      ></Input>
      <Input<Lesson>
        displayName="Lesson name"
        name={`lessons[${id}].name`}
        type="text"
        containerStyles="grow"
        inputStyles="focus:bg-white"
        placeholder="This lesson's name. Keep it short and sweet."
        maxLength={75}
        displayRemainingCharacters={true}
      ></Input>
      <LessonActions
        endTime={endTime}
        insert={insert}
        remove={remove}
        maxLength={maxLength}
        id={id}
      />
    </div>
  );
});

export default memo(Lesson);
