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
    <Accordion type="single" collapsible className="w-full rounded  py-0">
      <AccordionItem value="notes-accordion" className="bg-slate-900/20 py-0">
        <AccordionTrigger className="py-2">Notes</AccordionTrigger>
        <AccordionContent>
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="w-full bg-slate-900/40">
              <TabsTrigger className="w-1/2" value="notes">
                Notes
              </TabsTrigger>
              <TabsTrigger className="w-1/2" value="create-note">
                Create a note
              </TabsTrigger>
            </TabsList>
            <TabsContent value="notes">
              <Notes />
            </TabsContent>
            <TabsContent value="create-note">
              <NoteForm />
            </TabsContent>
          </Tabs>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default NotesPage;
