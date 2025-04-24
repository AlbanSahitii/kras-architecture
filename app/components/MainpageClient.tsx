"use client";
import React, {useEffect, useRef, useState, useMemo} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadSlim} from "@tsparticles/slim";
import {animate, inView} from "motion";
import {useInView, motion} from "motion/react";
import {type Container, type ISourceOptions} from "@tsparticles/engine";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Facebook, Instagram, MailIcon, MapPin, Twitter, X} from "lucide-react";

const MainpageClient = ({projectsData}) => {
  const [init, setInit] = useState(false);
  const divRef = useRef(projectsData.map(() => React.createRef()));
  const parahraphRef = useRef(null);
  const isInView = useInView(parahraphRef, {once: true});
  const linkRef = useRef(null);
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
                  transform: ["translateY(80px)", "translateY(0px)"],
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
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {};

  const options: ISourceOptions = useMemo(() => {
    return {
      autoPlay: true,
      background: {
        color: {
          value: "#000000",
        },
        opacity: 1,
      },
      backgroundMask: {
        composite: "destination-out",
        cover: {
          opacity: 1,
        },
        enable: false,
      },
      clear: true,
      defaultThemes: {},
      delay: 0,
      fullScreen: {
        enable: false,
        zIndex: 0,
      },
      detectRetina: true,
      duration: 0,
      fpsLimit: 120,
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
            parallax: {
              enable: false,
              force: 2,
              smooth: 10,
            },
          },
          resize: {
            delay: 0.5,
            enable: true,
          },
        },
        modes: {
          trail: {
            delay: 1,
            pauseOnStop: false,
            quantity: 1,
          },
          attract: {
            distance: 200,
            duration: 0.4,
            easing: "ease-out-quad",
            factor: 1,
            maxSpeed: 50,
            speed: 1,
          },
          bounce: {
            distance: 200,
          },
          bubble: {
            distance: 200,
            duration: 0.4,
            mix: false,
            divs: {
              distance: 200,
              duration: 0.4,
              mix: false,
            },
          },
          connect: {
            distance: 80,
            links: {
              opacity: 0.5,
            },
            radius: 60,
          },
          grab: {
            distance: 100,
            links: {
              blink: false,
              consent: false,
              opacity: 1,
            },
          },
          push: {
            default: true,
            groups: [],
            quantity: 4,
          },
          remove: {
            quantity: 2,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
            factor: 100,
            speed: 1,
            maxSpeed: 50,
            easing: "ease-out-quad",
            divs: {
              distance: 200,
              duration: 0.4,
              factor: 100,
              speed: 1,
              maxSpeed: 50,
              easing: "ease-out-quad",
            },
          },
          slow: {
            factor: 3,
            radius: 200,
          },
          particle: {
            replaceCursor: false,
            pauseOnStop: false,
            stopDelay: 0,
          },
          light: {
            area: {
              gradient: {
                start: {
                  value: "#ffffff",
                },
                stop: {
                  value: "#000000",
                },
              },
              radius: 1000,
            },
            shadow: {
              color: {
                value: "#000000",
              },
              length: 2000,
            },
          },
        },
      },
      manualParticles: [],
      particles: {
        bounce: {
          horizontal: {
            value: 1,
          },
          vertical: {
            value: 1,
          },
        },
        collisions: {
          absorb: {
            speed: 2,
          },
          bounce: {
            horizontal: {
              value: 1,
            },
            vertical: {
              value: 1,
            },
          },
          enable: false,
          maxSpeed: 50,
          mode: "bounce",
          overlap: {
            enable: true,
            retries: 0,
          },
        },
        color: {
          value: "#ff0000",
          animation: {
            h: {
              count: 0,
              enable: true,
              speed: 20,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0,
            },
            s: {
              count: 0,
              enable: false,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0,
            },
            l: {
              count: 0,
              enable: false,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0,
            },
          },
        },
        effect: {
          close: true,
          fill: true,
          options: {},
          type: "replace-text",
        },
        groups: {},
        move: {
          angle: {
            offset: 0,
            value: 90,
          },
          attract: {
            distance: 200,
            enable: false,
            rotate: {
              x: 3000,
              y: 3000,
            },
          },
          center: {
            x: 50,
            y: 50,
            mode: "percent",
            radius: 0,
          },
          decay: 0,
          distance: {},
          direction: "none",
          drift: 0,
          enable: true,
          gravity: {
            acceleration: 9.81,
            enable: false,
            inverse: false,
            maxSpeed: 50,
          },
          path: {
            clamp: true,
            delay: {
              value: 0,
            },
            enable: false,
            options: {},
          },
          outModes: {
            default: "out",
            bottom: "out",
            left: "out",
            right: "out",
            top: "out",
          },
          random: false,
          size: false,
          speed: 6,
          spin: {
            acceleration: 0,
            enable: false,
          },
          straight: false,
          trail: {
            enable: false,
            length: 10,
            fill: {},
          },
          vibrate: false,
          warp: false,
        },
        number: {
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
          limit: {
            mode: "delete",
            value: 0,
          },
          value: 300,
        },
        opacity: {
          value: 0.5,
          animation: {
            count: 0,
            enable: false,
            speed: 2,
            decay: 0,
            delay: 0,
            sync: false,
            mode: "auto",
            startValue: "random",
            destroy: "none",
          },
        },
        reduceDuplicates: false,
        shadow: {
          blur: 0,
          color: {
            value: "#000",
          },
          enable: false,
          offset: {
            x: 0,
            y: 0,
          },
        },
        shape: {
          close: true,
          fill: true,
          options: {},
          type: "circle",
        },
        size: {
          value: {
            min: 1,
            max: 3,
          },
          animation: {
            count: 0,
            enable: false,
            speed: 5,
            decay: 0,
            delay: 0,
            sync: false,
            mode: "auto",
            startValue: "random",
            destroy: "none",
          },
        },
        stroke: {
          width: 0,
        },
        zIndex: {
          value: 0,
          opacityRate: 1,
          sizeRate: 1,
          velocityRate: 1,
        },
        destroy: {
          bounds: {},
          mode: "none",
          split: {
            count: 1,
            factor: {
              value: 3,
            },
            rate: {
              value: {
                min: 4,
                max: 9,
              },
            },
            sizeOffset: true,
            particles: {},
          },
        },
        roll: {
          darken: {
            enable: false,
            value: 0,
          },
          enable: false,
          enlighten: {
            enable: false,
            value: 0,
          },
          mode: "vertical",
          speed: 25,
        },
        tilt: {
          value: 0,
          animation: {
            enable: false,
            speed: 0,
            decay: 0,
            sync: false,
          },
          direction: "clockwise",
          enable: false,
        },
        twinkle: {
          lines: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
          particles: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
        },
        wobble: {
          distance: 5,
          enable: false,
          speed: {
            angle: 50,
            move: 10,
          },
        },
        life: {
          count: 0,
          delay: {
            value: 0,
            sync: false,
          },
          duration: {
            value: 0,
            sync: false,
          },
        },
        rotate: {
          value: 0,
          animation: {
            enable: false,
            speed: 0,
            decay: 0,
            sync: false,
          },
          direction: "clockwise",
          path: false,
        },
        orbit: {
          animation: {
            count: 0,
            enable: false,
            speed: 1,
            decay: 0,
            delay: 0,
            sync: false,
          },
          enable: false,
          opacity: 1,
          rotation: {
            value: 45,
          },
          width: 1,
        },
        links: {
          blink: false,
          color: {
            value: "#ffffff",
          },
          consent: false,
          distance: 150,
          enable: true,
          frequency: 1,
          opacity: 0.4,
          shadow: {
            blur: 5,
            color: {
              value: "#000",
            },
            enable: false,
          },
          triangles: {
            enable: false,
            frequency: 1,
          },
          width: 1,
          warp: false,
        },
        repulse: {
          value: 0,
          enabled: false,
          distance: 1,
          duration: 1,
          factor: 1,
          speed: 1,
        },
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      responsive: [],
      smooth: false,
      style: {},
      themes: [],
      zLayers: 100,
      key: "basic",
      name: "Basic",
      motion: {
        disable: false,
        reduce: {
          factor: 4,
          value: true,
        },
      },
    };
  }, []);

  return (
    <>
      <section className={`w-lvh h-lvh bg-black`}>
        {init && (
          <Particles
            className="w-full h-full"
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
          />
        )}
      </section>
      <section className="relative">
        {projectsData.map((item, index) => (
          <div
            key={index}
            ref={divRef.current[index]}
            className={`relative w-lvh h-lvh bg-black flex flex-col-reverse overflow-hidden`}
          >
            <img
              className="absolute w-full h-full object-fill opacity-50 transition-transform duration-1000 ease-in-out scale-125"
              src={item.thumbnail}
              alt={item.title}
            ></img>

            <h1 className="project-title opacity-0 absolute z-10 text-2xl top-60 left-20 md:text-5xl md:inset-60 ">
              Your content here
            </h1>

            <div className=" z-20 bottom-0 left-10 flex items-center justify-between md:justify-end">
              <p className="custom-p-class m-3 text-1xl md:text-2xl border-b border-transparent hover:border-white  ">
                {item.type}
              </p>
              <p className="custom-p-class m-3 text-1xl md:text-2xl border-b border-transparent hover:border-white  ">{`${item.address}, ${item.city}, COUNTRY`}</p>{" "}
              <p className="custom-p-class m-3 text-1xl md:text-2xl border-b border-transparent hover:border-white  ">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="h-[70lvh] w-lvh flex flex-col justify-center items-center px-10 md:px-20 ">
        <motion.p
          ref={parahraphRef}
          className="text-center text-2xl md:text-4xl transform"
          initial={{opacity: 0, y: 50}}
          animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 50}}
          transition={{duration: 0.6}}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ut
          aliquid exercitationem quidem praesentium, iste ea accusamus vel eos,
          quas ipsa doloribus aspernatur dolore et ex eum minus blanditiis quam.
        </motion.p>
        <motion.p
          className="w-fit  mt-10 border-b border-transparent hover:border-white transition duration-300 ease-in-out"
          ref={linkRef}
          initial={{opacity: 0, y: 30}}
          animate={{opacity: isLinkInView ? 1 : 0, y: isLinkInView ? 0 : 50}}
          transition={{duration: 0.4}}
        >
          <Link href="/about">Learn more about us</Link>
        </motion.p>
      </section>

      <h1 className="text-center text-3xl md:text-5xl ">News</h1>

      <section className=" overflow-x-auto overflow-y-hidden flex pt-10 px-5 justify-evenly">
        {projectsData.map((project, index) => (
          <div key={index} className=" min-w-64 max-w-64 m-5 text-center">
            <p className="mb-4">{project.title}</p>
            <img className="h-96" src={project.thumbnail}></img>
            <p className="mt-4">{project.description}</p>
          </div>
        ))}
      </section>
      <footer className="w-lvh h-[40lvh] flex justify-center items-center ">
        <Accordion className="w-full mx-5 " type="single" collapsible>
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
      </footer>
    </>
  );
};

export default MainpageClient;
