"use client";
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
import {useParams, usePathname} from "next/navigation";
import clsx from "clsx";

function Footer() {
  const pathName = usePathname();
  const params = useParams();
  const isWhitePage = pathName?.split("/").find(e => e === "project");
  const isMainMenuPage = pathName === "/en" || pathName === "/de";
  return (
    <>
      <hr className={clsx(isWhitePage ? "w-full" : "hidden")} />
      <footer
        className={clsx(
          "relative w-full h-1/3 flex justify-center items-center border-none",
          isMainMenuPage && " "
        )}
      >
        <div
          className={clsx(
            "w-full absolute inset-0  bg-cover",
            isWhitePage
              ? "  "
              : "bg-[url('/background-logo-black.jpg')] opacity-5",
            isMainMenuPage ? "snap-start" : ""
          )}
        ></div>
        <div
          className={clsx(
            " w-full absolute inset-0 ",
            isWhitePage
              ? "bg-white"
              : "bg-gradient-to-b from-black to-transparent "
          )}
        ></div>

        <div className="relative z-10 text-white w-full m-20 border-none">
          <Accordion
            className={clsx(
              "h-full w-full mx-5 z-20 ",
              isWhitePage ? "text-black" : "text-white"
            )}
            type="single"
            collapsible
          >
            <AccordionItem
              value="item-1"
              className={clsx(
                isWhitePage ? "border-b border-black" : "border-b border-white"
              )}
            >
              <AccordionTrigger>{`${
                params!.locale === "en" ? "Contact Us" : "Kontakt"
              }`}</AccordionTrigger>

              <AccordionContent className="ml-2">
                <a href="mailto:contact@krasarchitects.com">
                  <MailIcon className="inline mr-2" />
                  contact@krasarchitects.com
                </a>
              </AccordionContent>
              <AccordionContent className="ml-2">
                <a href="tel:+4917684775093">
                  <PhoneIncoming className="inline mr-2" />
                  +49 17684775093
                </a>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className={clsx(
                isWhitePage ? "border-b border-black" : "border-b border-white"
              )}
            >
              <AccordionTrigger>{`${
                params!.locale === "en" ? "Socials" : "Soziale Netzwerke"
              }`}</AccordionTrigger>

              <AccordionContent className="ml-2">
                <Facebook className="inline mr-2" />
                <Link
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=61576569491054"
                >
                  Facebook
                </Link>
              </AccordionContent>
              <AccordionContent className="ml-2">
                <Instagram className="inline mr-2" />
                <Link
                  target="_blank"
                  href="https://www.instagram.com/krasarchitecture/"
                >
                  Instagram
                </Link>
              </AccordionContent>
              <AccordionContent className="ml-2">
                <Linkedin className="inline mr-2" />
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/company/kras-architecture-design"
                >
                  LinkedIn
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </footer>
    </>
  );
}

export default Footer;
