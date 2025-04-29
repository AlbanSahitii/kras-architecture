"use client";
import React, {useState} from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import Logo50 from "../../public/logo50.png";
import Link from "next/link";
import {Menu} from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={` z-40 fixed w-lvw pt-10 p-12 flex justify-between items-center bg-transparent`}
    >
      <Link href="/">
        <img className="border rounded-sm" src={Logo50.src} alt="Logo" />
      </Link>
      <Link href="/">
        <p className="[text-shadow:1px_1px_2px_black] tracking-widest">KRAS</p>
      </Link>
      <ol className="hidden md:flex mx-2">
        <li className="mx-2 border-b border-transparent hover:border-white transition duration-500 ease-in-out">
          <Link href="/projects">Projects</Link>
        </li>
        <li className="mx-2 border-b border-transparent hover:border-white transition duration-500 ease-in-out">
          <Link href="/about">About Us</Link>
        </li>
        <li className="mx-2 border-b border-transparent hover:border-white transition duration-500 ease-in-out">
          <Link href="/news">News</Link>
        </li>
        <li className="mx-2 border-b border-transparent hover:border-white transition duration-500 ease-in-out">
          <Link href="/news">Stories</Link>
        </li>
      </ol>
      <div className=" md:hidden">
        <Drawer>
          <DrawerTrigger>
            <Menu strokeWidth={3} />
          </DrawerTrigger>
          <DrawerContent className="bg-white text-black ">
            <DrawerHeader>
              <DrawerTitle className="font-normal m-3">
                <Link href="/news">News</Link>
              </DrawerTitle>
              <DrawerTitle className="font-normal m-3">
                <Link href="/projects">Projects</Link>
              </DrawerTitle>
              <DrawerTitle className="font-normal m-3">
                <Link href="/about">About Us</Link>
              </DrawerTitle>
              <DrawerTitle className="font-normal m-3">
                <Link href="/news">Stories</Link>
              </DrawerTitle>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
}

export default Navbar;
