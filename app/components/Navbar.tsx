"use client";
import React, {useState} from "react";
import {NavigationMenu} from "../../components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import Logo50 from "../../public/logo50.png";
import Link from "next/link";
import {Menu} from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={` fixed w-screen pt-10 p-12 flex justify-between items-center bg-transparent`}
    >
      <Link href="/">
        <img className="rounded-sm" src={Logo50.src} alt="Logo" />
      </Link>

      <ol className="hidden md:flex mx-2">
        <li className="mx-2">
          <Link href="/projects">Projects</Link>
        </li>
        <li className="mx-2">
          <Link href="/about">About Us</Link>
        </li>
        <li className="mx-2">
          <Link href="/news">News</Link>
        </li>
        <li className="mx-2">
          <Link href="/news">Stories</Link>
        </li>
      </ol>

      <NavigationMenu className="md:hidden">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger onClick={() => setOpen(!open)}>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-screen">
            <DropdownMenuItem>
              <Link href="/projects">Projects</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/about">About Us</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/news">News</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/news">Stories</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </NavigationMenu>
    </nav>
  );
}

export default Navbar;
