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
  PhoneIncoming,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

function Footer({contactUs, socials}) {
  return (
    <footer className="relative w-full h-1/3 flex justify-center items-center  ">
      <div className="w-full absolute inset-0 bg-[url('/background-logo-black.jpg')] bg-cover opacity-5"></div>

      <div className=" w-full absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>

      <div className="relative z-10 text-white w-full m-20 border-none">
        <Accordion
          className="h-full w-full mx-5 z-20 "
          type="single"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>{`${contactUs}`}</AccordionTrigger>

            <AccordionContent className="ml-2">
              <a href={`mailto:contact@krasarchitects.com`}>
                <MailIcon className="inline mr-2" />
                contact@krasarchitects.com
              </a>
            </AccordionContent>
            <AccordionContent className="ml-2">
              <a href={`tel:+4917684775093`}>
                <PhoneIncoming className="inline mr-2" />
                +49 17684775093
              </a>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>{`${socials}`}</AccordionTrigger>
            <AccordionContent className="ml-2">
              <Facebook className="inline mr-2" />
              <Link href="https://www.facebook.com/profile.php?id=61576569491054">
                Facebook
              </Link>
            </AccordionContent>
            <AccordionContent className="ml-2">
              <Instagram className="inline mr-2" />
              <Link href="https://www.instagram.com/krasarchitecture/">
                Instagram
              </Link>
            </AccordionContent>
            <AccordionContent className="ml-2">
              <Linkedin className="inline mr-2" />
              <Link href="twitter.com">LinkedIn</Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </footer>
  );
}

export default Footer;
