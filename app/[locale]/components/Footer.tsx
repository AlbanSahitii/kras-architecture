import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Facebook,
  Instagram,
  MailIcon,
  MapPin,
  X,
  PhoneIncoming,
} from "lucide-react";
import Link from "next/link";

function Footer({address, contactUs, socials}) {
  return (
    <footer className="relative w-full h-1/3 flex justify-center items-center ">
      <div className="w-full absolute inset-0 bg-[url('/background-logo-black.jpg')] bg-cover opacity-5"></div>

      <div className=" w-full absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>

      <div className="relative z-10 text-white w-full m-20 border-none">
        <Accordion
          className="h-full w-full mx-5 z-20 "
          type="single"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>{`${address}?`}</AccordionTrigger>
            <AccordionContent>
              <MapPin className="inline mr-2" />
              Soon
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>{`${contactUs}?`}</AccordionTrigger>

            <AccordionContent>
              <MailIcon className="inline mr-2" />
              contact@krasarchitects.com
            </AccordionContent>
            <AccordionContent>
              <PhoneIncoming className="inline mr-2" />
              +49 17684775093
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>{`${socials}?`}</AccordionTrigger>
            <AccordionContent className="">
              <Facebook className="inline mr-2" />
              <Link href="facebook.com">Facebook</Link>
            </AccordionContent>
            <AccordionContent>
              <Instagram className="inline mr-2" />
              <Link href="instagram.com">instagram</Link>
            </AccordionContent>
            <AccordionContent>
              <X className="inline mr-2" />
              <Link href="twitter.com">twitter</Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </footer>
  );
}

export default Footer;
