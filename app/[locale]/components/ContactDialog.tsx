import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {MailIcon, PhoneIncoming} from "lucide-react";
function ContactDialog({contact, closeText}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="font-normal m-0 cursor-pointer">{contact}</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white ">
        <DialogHeader className="text-black ">
          <DialogTitle>{contact}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-black ">
          <MailIcon className="inline mr-3" />
          <a href={`mailto:contact@krasarchitects.com`}>
            contact@krasarchitects.com
          </a>
        </DialogDescription>
        <DialogDescription className="text-black">
          <PhoneIncoming className="inline mr-2" />
          <a href={`tel:+4917684775093`}>+49 17684775093</a>
        </DialogDescription>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild className="mt-2">
            <Button>{closeText}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ContactDialog;
