"use client";
import React, {useEffect, useRef, useState, useMemo} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadFull} from "tsparticles";
import {type Container, type ISourceOptions} from "@tsparticles/engine";
import {animate, inView} from "motion";
import {useInView, motion} from "motion/react";
import Link from "next/link";

const MainpageClient = ({projectsData}) => {
  const [init, setInit] = useState(false);
  const divRef = useRef(projectsData.map(() => React.createRef()));
  const parahraphRef = useRef(null);
  const linkRef = useRef(null);
  const isInView = useInView(parahraphRef, {once: true});
  const isLinkInView = useInView(linkRef, {once: true});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    divRef.current.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    return () => {
      divRef.current.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [projectsData]);

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {};

  return (
    <>
      <section className=" z-10 relative w-full h-screen bg-black"></section>
      <section className="relative">
        {projectsData.map((item, index) => (
          <div
            key={index}
            ref={divRef.current[index]}
            className={`relative w-full min-h-lvh bg-black flex flex-col-reverse overflow-hidden`}
          >
            <img
              className="absolute w-full min-h-lvh object-cover  opacity-50 transition-transform duration-1000 ease-in-out scale-125"
              src={item.thumbnail}
              alt={item.title}
            ></img>
            <Link href={`/project/${item.title}`}>
              <h1 className="project-title opacity-0 absolute z-10 text-2xl top-60 left-20 md:text-5xl md:inset-60 ">
                {item.title}
              </h1>
            </Link>
            <div className=" z-20 bottom-0 left-10 flex items-center justify-between md:justify-end">
              <p className="custom-p-class m-3 text-1xl md:text-2xl border-b border-transparent hover:border-white transition duration-500 ease-in-out  ">
                {item.type}
              </p>
              <p className="custom-p-class m-3 text-1xl md:text-2xl border-b border-transparent hover:border-white transition duration-500 ease-in-out  ">
                {item.city}
              </p>
              <p className="custom-p-class m-3 text-1xl md:text-2xl border-b border-transparent hover:border-white transition duration-500 ease-in-out  ">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="h-[70lvh] w-full flex flex-col justify-center items-center px-10 md:px-20 ">
        <motion.p
          ref={parahraphRef}
          className="text-center text-2xl md:text-4xl transform"
          initial={{opacity: 0, y: 50}}
          animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 50}}
          transition={{duration: 0.6}}
        >
          Our focus is on developing aesthetically striking and individual
          architectural projects that inspire and improve the way people live. .
        </motion.p>
        <motion.p
          className="w-fit mt-10 border-b border-transparent hover:border-white transition duration-300 ease-in-out"
          ref={linkRef}
          initial={{opacity: 0, y: 30}}
          animate={{opacity: isLinkInView ? 1 : 0, y: isLinkInView ? 0 : 50}}
          transition={{duration: 0.2}}
        >
          <Link href="/about">Learn more about us</Link>
        </motion.p>
      </section>

      <h1 className="text-center text-3xl md:text-5xl ">News</h1>

      <section className="black-scrollbar overflow-x-auto overflow-y-hidden flex pt-10 pb-10  justify-evenly">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="text-center min-w-fit m-1 md:min-w-96 md:max-w-96 "
          >
            <Link href={`/project/${project.title}`}>
              <p className="mb-4">{project.title}</p>
              <img className="h-96 max-w-9/10" src={project.thumbnail}></img>
              <p className="mt-4 truncate">{project.description}</p>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default MainpageClient;
