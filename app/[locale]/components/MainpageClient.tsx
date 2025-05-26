"use client";
import React, {useEffect, useRef} from "react";
import {useInView, motion, animate, inView} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import LogoAnimation from "./LogoAnimation";
import {useParams} from "next/navigation";

const MainpageClient = ({
  projectsData,
  heroTitle,
  heroLearnMoreAboutUs,
  newTitle,
}) => {
  const params = useParams();
  const divRef = useRef(projectsData.map(() => React.createRef()));
  const parahraphRef = useRef(null);
  const linkRef = useRef(null);
  const isInView = useInView(parahraphRef, {once: true});
  const isLinkInView = useInView(linkRef, {once: true});
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const imgElement = entry.target.querySelector("img");
            const h1Element = entry.target.querySelector(".project-title");
            const pElement = entry.target.querySelectorAll(".custom-p-class");

            if (imgElement) {
              inView(imgElement, () => {
                animate(
                  imgElement,
                  {scale: 1},
                  {duration: 0.1, ease: "easeOut"}
                );
              });
            }

            if (h1Element) {
              animate(
                h1Element as HTMLElement,
                {
                  opacity: [0, 1],
                  transform: ["translateY(300px)", "translateY(0px)"],
                },
                {
                  duration: 0.9,
                  ease: "easeOut",
                }
              );
              h1Element.classList.remove("project-title");
            }

            if (pElement) {
              for (let i = 0; i < pElement.length; i++) {
                animate(
                  pElement[i] as HTMLElement,
                  {
                    opacity: [0, 1],
                    transform: ["translateY(80px)", "translateY(0px)"],
                  },
                  {
                    duration: 1,
                    ease: "easeOut",
                  }
                );
                pElement[i].classList.remove("custom-p-class");
              }
            }
          }
        });
      },
      {threshold: 0.5}
    );

    const elementsToObserve = divRef.current
      .map(ref => ref.current)
      .filter(Boolean);

    elementsToObserve.forEach(el => observer.observe(el!));

    return () => {
      elementsToObserve.forEach(el => observer.unobserve(el!));
    };
  }, [projectsData]);

  return (
    <>
      <section className="flex items-center justify-center z-10 relative w-full h-screen bg-black">
        <LogoAnimation />
      </section>
      <section className="relative " id="page1">
        {projectsData.map((item, index) => (
          <div
            key={index}
            ref={divRef.current[index]}
            className={`relative w-full h-screen bg-black flex flex-col-reverse overflow-hidden snap-start`}
          >
            <Image
              className="absolute w-full min-h-[100vh] object-cover opacity-50 transition-transform duration-1000 ease-in-out scale-125 hover:scale-100"
              src={item.thumbnail}
              alt={params!.locale === "en" ? item.title : item.germanTitle}
              layout="fill"
            />
            <Link href={`/${params!.locale}/project/${item.title}`}>
              <h1 className="project-title opacity-0 absolute z-10 text-2xl top-60 left-20 md:text-5xl md:inset-60 ">
                {params!.locale === "en" ? item.title : item.germanTitle}
              </h1>
            </Link>
            <div className=" z-20 bottom-0 left-10 flex items-center justify-between md:justify-end">
              <Link href={`/${params!.locale}/projects/${item.type}`}>
                <p className="custom-p-class m-3 text-1xl md:text-2xl border-b border-transparent hover:border-white transition duration-500 ease-in-out  ">
                  {params!.locale === "en" ? item.type : item.germanType}
                </p>
              </Link>
              <p className="custom-p-class m-3 text-1xl md:text-2xl border-b border-transparent hover:border-white transition duration-500 ease-in-out  ">
                {item.city}
              </p>
              <p className="custom-p-class m-3 text-1xl md:text-2xl border-b border-transparent hover:border-white transition duration-500 ease-in-out  ">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className=" w-full flex flex-col justify-center items-center px-10 md:px-20 snap-start overflow-hidden">
        <motion.p
          ref={parahraphRef}
          className="text-center text-2xl md:text-4xl transform pt-36"
          initial={{opacity: 0, y: 50}}
          animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 50}}
          transition={{duration: 0.6}}
        >
          {heroTitle}
        </motion.p>
        <motion.p
          className="w-fit mt-10 border-b border-transparent hover:border-white transition duration-300 ease-in-out my-20"
          ref={linkRef}
          initial={{opacity: 0, y: 30}}
          animate={{opacity: isLinkInView ? 1 : 0, y: isLinkInView ? 0 : 50}}
          transition={{duration: 0.2}}
        >
          <Link href={`/${params!.locale}/about`}>{heroLearnMoreAboutUs}</Link>
        </motion.p>
      </section>

      <h1 className="text-center text-3xl md:text-5xl md:pb-6 md:pt-20 snap-start">
        {newTitle}
      </h1>

      <section className="black-scrollbar overflow-x-auto overflow-y-hidden flex pt-10 pb-10  justify-evenly snap-start">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="text-center min-w-fit m-1 md:min-w-96 md:max-w-96 "
          >
            <Link href={`/${params!.locale}/project/${project.title}`}>
              <p className="mb-4">
                {params!.locale === "en" ? project.title : project.germanTitle}
              </p>
              <div className=" relative h-96 max-w-9/10">
                <Image
                  className="w-full h-full absolute"
                  src={project.thumbnail}
                  alt="thumbnail"
                  layout="fill"
                />
              </div>
              <p className="mt-4 truncate">
                {params!.locale === "en"
                  ? project.description
                  : project.germanDescription}
              </p>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default MainpageClient;
