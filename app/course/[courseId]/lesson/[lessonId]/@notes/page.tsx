import { getServerAuthSession } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Notes from "../../../components/Notes";
import NoteForm from "../../../components/NoteForm";
async function NotesPage() {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }
  return (
    <Accordion type="single" collapsible className="w-full rounded border">
      <AccordionItem value="notes-accordion" className="bg-slate-900/20 px-2">
        <AccordionTrigger className="px-2">Notes</AccordionTrigger>
        <AccordionContent className="px-2">
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="w-full bg-slate-900/40">
              <TabsTrigger className="w-1/2" value="notes">
                Notes
              </TabsTrigger>
              <TabsTrigger className="w-1/2" value="create-note">
                Create a note
              </TabsTrigger>
            </TabsList>
            <TabsContent value="notes" className="flex justify-center px-4">
              <Notes />
            </TabsContent>
            <TabsContent
              value="create-note"
              className="flex justify-center px-4"
            >
              <NoteForm />
            </TabsContent>
          </Tabs>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default NotesPage;
