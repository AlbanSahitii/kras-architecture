"use client";
import React, {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import clsx from "clsx";
import Link from "next/link";
import {Menu} from "lucide-react";
import Image from "next/image";
import {useParams, usePathname} from "next/navigation";
import LanguageToggle from "./LanguageToggle";
import ContactDialog from "./ContactDialog";
import logoWhiteNoText from "../../../public/white-logo-notext.png";
import logoBlackNoText from "../../../public/black-logo-notext.png";
function Navbar({projects, aboutUs, contact, closeText, chronicle}) {
  const params = useParams();
  const pathName = usePathname();
  const isWhitePage = pathName?.split("/").find(e => e === "project");
  const [isOpen, setIsOpen] = useState(false);
  const [isPage1InView, setIsPage1InView] = useState(false);
  const [isPage0InView, setIsPage0InView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const closeDrawer = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const checkPageVisibility = () => {
      const page1 = document.getElementById("page1");
      const page0 = document.getElementById("page0");

      if (
        page1 &&
        page1.getBoundingClientRect().top < window.innerHeight &&
        page1.getBoundingClientRect().bottom > 0
      ) {
        setIsPage1InView(true);
      } else {
        setIsPage1InView(false);
      }

      if (
        page0 &&
        page0.getBoundingClientRect().top < window.innerHeight &&
        page0.getBoundingClientRect().bottom > 0
      ) {
        setIsPage0InView(true);
      } else {
        setIsPage0InView(false);
      }
    };

    window.addEventListener("scroll", checkPageVisibility);
    checkPageVisibility();

    return () => {
      window.removeEventListener("scroll", checkPageVisibility);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logoAndTitleAnimation = {
    hidden: {y: -50, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
      transition: {type: "spring", stiffness: 200},
    },
    exit: {y: 50, opacity: 0, transition: {type: "spring", stiffness: 200}},
  };
  const navBarAnimation = {
    hidden: {y: -50, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
      transition: {type: "easeInOut", stiffness: 1400},
    },
    exit: {y: 50, opacity: 0, transition: {type: "spring", stiffness: 200}},
  };
  return (
    <>
      <header>
        <motion.nav
          variants={navBarAnimation}
          animate={
            !isMobile || isPage1InView || isPage0InView ? "visible" : "hidden"
          }
          exit="exit"
          className={clsx(
            "z-20 fixed w-svw  px-10 pb-6 pt-4 md:pb-3 md:px-12 md:pt-3 flex justify-between items-center  bg-gradient-to-b  backdrop-blur-lg ",
            isWhitePage
              ? "text-black from-black/30 via-black/10  to-black/[0.005]"
              : "from-white/30 via-white/10  to-white/[0.005] text-white"
          )}
        >
          <Link href="/">
            <motion.div
              className="border rounded-sm border-none"
              variants={logoAndTitleAnimation}
              animate={
                !isMobile || isPage1InView || isPage0InView
                  ? "visible"
                  : "hidden"
              }
              exit="exit"
            >
              {isWhitePage ? (
                <Image
                  src={logoBlackNoText}
                  alt="Logo"
                  width={30}
                  height={30}
                />
              ) : (
                <Image
                  src={logoWhiteNoText}
                  alt="Logo"
                  width={30}
                  height={30}
                />
              )}
            </motion.div>
          </Link>

          <motion.p
            variants={logoAndTitleAnimation}
            animate={
              !isMobile || isPage1InView || isPage0InView ? "visible" : "hidden"
            }
            exit="exit"
            className="tracking-widest [text-shadow:1px_1px_2px_black] absolute  md:static  my-end-range:absolute left-[45%] md:left-[48%] "
          >
            KRAS
          </motion.p>
          <ol className="hidden md:flex mx-2 items-center">
            <li
              className={clsx(
                "mx-2 border-b border-transparent transition duration-500 ease-in-out",
                isWhitePage ? "hover:border-black" : "hover:border-white"
              )}
            >
              <Link href={`/${params!.locale}/projects`}>{projects}</Link>
            </li>
            <li
              className={clsx(
                "mx-2 border-b border-transparent transition duration-500 ease-in-out",
                isWhitePage ? "hover:border-black" : "hover:border-white"
              )}
            >
              <Link href={`/${params!.locale}/about`}>{aboutUs}</Link>
            </li>
            <li
              className={clsx(
                "mx-2 border-b border-transparent transition duration-500 ease-in-out",
                isWhitePage ? "hover:border-black" : "hover:border-white"
              )}
            >
              <Link href={`/${params!.locale}/blog`}>{chronicle}</Link>
            </li>
            <li
              className={clsx(
                "mx-2 border-b border-transparent transition duration-500 ease-in-out",
                isWhitePage ? "hover:border-black" : "hover:border-white"
              )}
            >
              <ContactDialog closeText={closeText} contact={contact} />
            </li>
            <li className="ml-4">
              <LanguageToggle isWhitePage={isWhitePage} />
            </li>
          </ol>
        </motion.nav>
        <div className="fixed right-8 top-6 z-50 md:hidden ">
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger onClick={e => e.currentTarget.blur()}>
              <Menu
                strokeWidth={3}
                color={isWhitePage ? "black" : "white"}
                className="opacity-60"
              />
            </DrawerTrigger>
            <DrawerContent
              aria-describedby={undefined}
              className="bg-white text-black"
            >
              <DrawerHeader>
                <DrawerTitle className="font-normal m-3">
                  <Link
                    href={`/${params!.locale}/projects`}
                    onClick={closeDrawer}
                  >
                    {projects}
                  </Link>
                </DrawerTitle>
                <DrawerTitle className="font-normal m-3">
                  <Link href={`/${params!.locale}/blog`} onClick={closeDrawer}>
                    {chronicle}
                  </Link>
                </DrawerTitle>
                <DrawerTitle className="font-normal m-3">
                  <Link href={`/${params!.locale}/about`} onClick={closeDrawer}>
                    {aboutUs}
                  </Link>
                </DrawerTitle>
                <DrawerTitle className="m-3">
                  <ContactDialog closeText={closeText} contact={contact} />
                </DrawerTitle>
                <DrawerTitle className="font-normal m-3">
                  <LanguageToggle isWhitePage={isWhitePage} />
                </DrawerTitle>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </div>
      </header>
    </>
  );
}

export default Navbar;
