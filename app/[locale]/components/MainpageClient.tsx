"use client";

import React, {useEffect, useRef, useState} from "react";
import {useInView, motion, animate} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import LogoAnimation from "./LogoAnimation";
import {useParams} from "next/navigation";
import Footer from "./Footer";

const MainpageClient = ({
  projectTypes,
  projectsData,
  heroTitle,
  heroLearnMoreAboutUs,
  newTitle,
}) => {
  const params = useParams!();
  const divRef = useRef(projectsData.map(() => React.createRef()));
  const paragraphRef = useRef(null);
  const linkRef = useRef(null);
  const isInView = useInView(paragraphRef, {once: true, amount: 1});
  const isLinkInView = useInView(linkRef, {once: true, amount: 1});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const container = entry.target;
            const imgElement = container.querySelector("img");
            const h1Element = container.querySelector(".project-title");
            const pElements = container.querySelectorAll(".custom-p-class");

            if (imgElement) {
              animate(imgElement, {scale: 1}, {duration: 0.1, ease: "easeOut"});
            }

            if (h1Element) {
              animate(
                h1Element,
                {
                  opacity: [0, 1],
                  transform: ["translateY(300px)", "translateY(0px)"],
                },
                {duration: 0.9, ease: "easeOut"}
              );
              h1Element.classList.remove("project-title");
            }

            pElements.forEach(p => {
              animate(
                p,
                {
                  opacity: [0, 1],
                  transform: ["translateY(80px)", "translateY(0px)"],
                },
                {duration: 0.9, ease: "easeOut"}
              );
              p.classList.remove("custom-p-class");
            });
          }
        });
      },
      {threshold: 0.8}
    );

    const elementsToObserve = divRef.current
      .map(ref => ref.current)
      .filter(Boolean);
    elementsToObserve.forEach(el => observer.observe(el));

    return () => elementsToObserve.forEach(el => observer.unobserve(el));
  }, [projectsData]);
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);
  useEffect(() => {
    // Detect window size after component mounts
    const updateWindowSize = () => {
      setIsMobile(window.innerWidth < 640); // Threshold for mobile devices
    };

    updateWindowSize(); // Set initial value
    window.addEventListener("resize", updateWindowSize); // Listen for window resize

    return () => {
      window.removeEventListener("resize", updateWindowSize); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="overflow-y-scroll snap-y snap-mandatory h-[calc(var(--vh,1vh)*100)] pt-[60px]"
        id="main-menu-scroll-container"
      >
        <section className="snap-start  w-full flex items-center justify-center bg-black z-10 relative">
          <LogoAnimation />
        </section>

        {projectsData.map((item, index) => (
          <section
            key={index}
            ref={divRef.current[index]}
            className="relative snap-start w-full h-[calc(var(--vh,1vh)*100)] flex flex-col justify-end bg-black overflow-hidden"
          >
            {isMobile ? (
              <Image
                className="absolute top-0 left-0 w-full h-full object-cover opacity-50 transition-transform duration-1000 ease-in-out scale-125 pointer-events-none snap-start"
                src={item.thumbnailMobile}
                alt={item.title}
                fill
                quality={75}
                priority
              />
            ) : (
              <Image
                className="absolute top-0 left-0 w-full h-full object-cover opacity-50 transition-transform duration-1000 ease-in-out scale-125 pointer-events-none snap-start"
                src={item.thumbnail}
                alt={item.title}
                quality={75}
                fill
                priority
              />
            )}

            <Link href={`/${params!.locale}/project/${item.title}`}>
              <h1 className="project-title opacity-0 absolute z-10 text-2xl top-60 left-20 md:text-5xl md:inset-60 text-white">
                {params!.locale === "en"
                  ? item.title.toUpperCase()
                  : item.germanTitle.toUpperCase()}
              </h1>
            </Link>

            <div className="z-20 bottom-0 left-10 flex flex-wrap justify-between md:justify-end text-white text-xl md:text-2xl p-4 gap-4">
              <Link href={`/${params!.locale}/projects/${item.type}`}>
                <p className="custom-p-class border-b border-transparent hover:border-white transition duration-500 ease-in-out">
                  {projectTypes[item.type].type}
                </p>
              </Link>
              <p className="custom-p-class border-b border-transparent hover:border-white transition duration-500 ease-in-out">
                {item.city}
              </p>
              <p className="custom-p-class border-b border-transparent hover:border-white transition duration-500 ease-in-out">
                {item.date}
              </p>
            </div>
          </section>
        ))}

        <section className="w-full flex flex-col justify-center items-center px-10 md:px-20 bg-black text-white overflow-hidden snap-start">
          <motion.p
            ref={paragraphRef}
            className="text-center text-2xl md:text-4xl pt-36"
            initial={{opacity: 0, y: 50}}
            animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 50}}
            transition={{duration: 0.6}}
          >
            {heroTitle}
          </motion.p>

          <motion.p
            ref={linkRef}
            className="w-fit mt-10 border-b border-transparent hover:border-white transition duration-300 ease-in-out my-20"
            initial={{opacity: 0, y: 30}}
            animate={{opacity: isLinkInView ? 1 : 0, y: isLinkInView ? 0 : 50}}
            transition={{duration: 0.4}}
          >
            <Link href={`/${params!.locale}/about`}>
              {heroLearnMoreAboutUs}
            </Link>
          </motion.p>
        </section>

        {/* Horizontal scroll section */}
        <h1 className="text-center text-3xl md:text-5xl md:pb-6 md:pt-20 text-white bg-black snap-start">
          {newTitle}
        </h1>
        <section className="black-scrollbar overflow-x-auto overflow-y-hidden flex pt-10 pb-10 bg-black text-white snap-start">
          {projectsData.map((project, index) => (
            <div key={index} className="w-96 flex-none ml-2 text-center">
              <Link href={`/${params!.locale}/project/${project.title}`}>
                <p className="mb-4">
                  {params!.locale === "en"
                    ? project.title.toUpperCase()
                    : project.germanTitle.toUpperCase()}
                </p>
                <div className="relative h-96 w-96">
                  <Image
                    className="h-full w-full object-cover"
                    src={project.thumbnail}
                    alt="thumbnail"
                    fill
                    quality={75}
                  />
                </div>
                <p className="mt-4 truncate whitespace-nowrap">
                  {params!.locale === "en"
                    ? project.description.children[0].children[0].text
                    : project.germanDescription.children[0].children[0].text}
                </p>
              </Link>
            </div>
          ))}
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default MainpageClient;
