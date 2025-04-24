"use client";
import React, {useEffect, useRef, useState, useMemo} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadFull} from "tsparticles";
import {type Container, type ISourceOptions} from "@tsparticles/engine";
import {animate, inView} from "motion";
import {useInView, motion} from "motion/react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Facebook, Instagram, MailIcon, MapPin, X} from "lucide-react";

const MainpageClient = ({projectsData}) => {
  const [init, setInit] = useState(false);
  const divRef = useRef(projectsData.map(() => React.createRef()));
  const parahraphRef = useRef(null);
  const isInView = useInView(parahraphRef, {once: true});
  const linkRef = useRef(null);
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

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: false,
      },
      background: {
        color: "#000000",
      },
      particles: {
        number: {
          value: 40,
          density: {
            enable: true,
            area: 800,
          },
        },
        shape: {
          type: "image",
          options: {
            image: {
              src: "/logo-white.png",
              height: 100,
              width: 100,
            },
          },
        },
        size: {
          value: 200,
          random: true,
        },
        move: {
          enable: true,
          speed: 4,
          direction: "none",
          outModes: {
            default: "out",
          },
        },
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          push: {
            quantity: 1,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
    }),
    []
  );

  return (
    <>
      <section className="relative w-full h-screen bg-black">
        {init && (
          <Particles
            className="absolute inset-0 w-full h-full opacity-10"
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
          />
        )}
        <div className="absolute top-1/2  right-1/3 transform -translate-y-1/2 w-1/2 flex justify-start items-center px-4 ">
          <h1 className="text-2xl text-white md:text-4xl">
            Our work is the creation of inspiring architecture, the sharing of
            our design vision, supported by our commitment to innovation and
            sustainability.
          </h1>
        </div>
      </section>
      <section className="relative">
        {projectsData.map((item, index) => (
          <div
            key={index}
            ref={divRef.current[index]}
            className={`relative w-full min-h-lvh bg-black flex flex-col-reverse overflow-hidden`}
          >
            <img
              className="absolute w-full min-h-lvh object-cover  opacity-50 transition-transform duration-1000 ease-in-out scale-150"
              src={item.thumbnail}
              alt={item.title}
            ></img>

            <h1 className="project-title opacity-0 absolute z-10 text-2xl top-60 left-20 md:text-5xl md:inset-60 ">
              {item.title}
            </h1>

            <div className=" z-20 bottom-0 left-10 flex items-center justify-between md:justify-end">
              <p className="custom-p-class m-3 text-1xl md:text-2xl border-b border-transparent hover:border-white transition duration-500 ease-in-out  ">
                {item.type}
              </p>
              <p className="custom-p-class m-3 text-1xl md:text-2xl border-b border-transparent hover:border-white transition duration-500 ease-in-out  ">{`${item.address}, ${item.city}, COUNTRY`}</p>{" "}
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
          transition={{duration: 0.4}}
        >
          <Link href="/about">Learn more about us</Link>
        </motion.p>
      </section>

      <h1 className="text-center text-3xl md:text-5xl ">News</h1>

      <section className="black-scrollbar overflow-x-auto overflow-y-hidden flex pt-10 pb-10  justify-evenly">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="text-center min-w-full m-1 md:min-w-96 md:max-w-96 "
          >
            <p className="mb-4">{project.title}</p>
            <img className="h-96 max-w-9/10" src={project.thumbnail}></img>
            <p className="mt-4 truncate">{project.description}</p>
          </div>
        ))}
      </section>
      <footer className="relative w-full h-[40lvh] flex justify-center items-center">
        <div className="w-full absolute inset-0 bg-[url('/background-logo-black.jpg')] bg-cover opacity-5"></div>

        <div className=" w-full absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>

        <div className="relative z-10 text-white w-full m-20 border-none">
          <Accordion className=" mx-5 z-20 " type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Address?</AccordionTrigger>
              <AccordionContent>
                <MapPin className="inline mr-2" />
                VR
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Contact Us?</AccordionTrigger>

              <AccordionContent>
                <MailIcon className="inline mr-2" />
                kras@kras.com
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Socials?</AccordionTrigger>
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
    </>
  );
};

export default MainpageClient;
