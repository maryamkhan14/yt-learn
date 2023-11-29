"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Modal({
  children,
  size,
  title,
  description,
  trigger,
}: {
  children: React.ReactNode;
  size?: "xl" | "md" | "sm";
  title?: string;
  description?: string;
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="h-[70%] w-full overflow-y-scroll bg-slate-800/90 md:h-[80%]">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
