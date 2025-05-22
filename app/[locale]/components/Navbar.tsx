"use client";
import React, {useState} from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import Logo50 from "../../../public/logo50.png";
import Link from "next/link";
import {Menu} from "lucide-react";
import Image from "next/image";
import {useParams} from "next/navigation";
import LanguageToggle from "./LanguageToggle";

function Navbar({projects, aboutUs, news}) {
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = () => {
    setIsOpen(false);
  };
  return (
    <nav
      className={`z-40 fixed w-lvw pt-10 p-10  md:p-12 flex justify-between items-center bg-transparent`}
    >
      <Link href="/">
        <Image
          className="border rounded-sm"
          src={Logo50.src}
          alt="Logo"
          width={50}
          height={50}
        />
      </Link>
      <Link href={`/${params!.locale}/`}>
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [text-shadow:1px_1px_2px_black] tracking-widest">
          KRAS
        </p>
      </Link>

      <ol className="hidden md:flex mx-2 items-center">
        <li className="mx-2 border-b border-transparent hover:border-white transition duration-500 ease-in-out">
          <Link href={`/${params!.locale}/projects`}>{projects}</Link>
        </li>
        <li className="mx-2 border-b border-transparent hover:border-white transition duration-500 ease-in-out">
          <Link href={`/${params!.locale}/about`}>{aboutUs}</Link>
        </li>
        <li className="mx-2 border-b border-transparent hover:border-white transition duration-500 ease-in-out">
          <Link href={`/${params!.locale}/news`}>{news}</Link>
        </li>
        <li className="ml-4">
          <LanguageToggle />
        </li>
      </ol>
      <div className="md:hidden">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger onClick={e => e.currentTarget.blur()}>
            <Menu strokeWidth={3} />
          </DrawerTrigger>
          <DrawerContent
            aria-describedby={undefined}
            className="bg-white text-black "
          >
            <DrawerHeader>
              <DrawerTitle className="font-normal m-3">
                <Link href={`/${params!.locale}/news`} onClick={closeDrawer}>
                  {news}
                </Link>
              </DrawerTitle>
              <DrawerTitle className="font-normal m-3">
                <Link
                  href={`/${params!.locale}/projects`}
                  onClick={closeDrawer}
                >
                  {projects}
                </Link>
              </DrawerTitle>
              <DrawerTitle className="font-normal m-3">
                <Link href={`/${params!.locale}/about`} onClick={closeDrawer}>
                  {aboutUs}
                </Link>
              </DrawerTitle>
              <DrawerTitle className="font-normal m-3 ">
                <LanguageToggle />
              </DrawerTitle>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
}

export default Navbar;
