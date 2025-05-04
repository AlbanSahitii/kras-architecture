"use client";
import Link from "next/link";
import {useEffect, useRef} from "react";
import {useInView, motion} from "motion/react";
import ImagesAlbum from "./ImagesAlbum";
function ProjectDetailPageClient({project, suggestedProject}) {
  const projectTitleRef = useRef(null);
  const projectDescriptionRef = useRef(null);
  const isProjectTitleInView = useInView(projectTitleRef, {once: true});
  const isProjectDescriptionInView = useInView(projectDescriptionRef, {
    once: true,
  });

  const projectImagesTitleRef = useRef(null);
  const projectImagesTitleInView = useInView(projectImagesTitleRef, {
    once: true,
  });

  const nextProjectParRef = useRef(null);
  const nextProjectParInView = useInView(nextProjectParRef, {once: true});

  const nextProjectTitleRef = useRef(null);
  const nextProjectTitleInView = useInView(nextProjectTitleRef, {once: true});

  const nextProjectRef = useRef(null);
  const nextProjectInView = useInView(nextProjectRef, {once: true});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const variants = {
    hidden: {opacity: 0, clipPath: "inset(0 0 0 100%)"},
    visible: {
      opacity: 1,
      clipPath: "inset(0 0 0 0)",
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <div className=" px-3 pt-40 md:px-20">
        <section className="">
          <h1 className="tracking-wide">{project.type}</h1>
          <h1 className="text-2xl md:text-8xl tracking-wider">
            {project.title}
          </h1>
        </section>
        <section className="mt-5 flex justify-center flex-col md:flex-row md:justify-between md:px-20">
          <div className="flex justify-between  md:flex-none md:pt-32 md:w-1/5">
            <div className="mr-10 ">
              <p>Date</p>
              <p>{project.date}</p>
            </div>
            <div>
              <p>Location</p>
              <p>{project.city}</p>
            </div>
          </div>
          <div className=" md:ml-10 md:w-3/5">
            <motion.img
              alt="thumbnail"
              className="w-auto mt-10 rounded-lg md:h-5/6 "
              src={project.thumbnail}
            />
          </div>
        </section>
      </div>

      <div className="p-5 md:mx-60">
        <motion.h1
          ref={projectTitleRef}
          className="text-center text-2xl md:text-4xl transform"
          initial={{opacity: 0, y: 50}}
          animate={{
            opacity: isProjectTitleInView ? 1 : 0,
            y: isProjectTitleInView ? 0 : 50,
          }}
          transition={{duration: 0.6}}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit
        </motion.h1>
        <motion.p
          ref={projectDescriptionRef}
          className="transform my-7"
          initial={{opacity: 0, y: 50}}
          animate={{
            opacity: isProjectDescriptionInView ? 1 : 0,
            y: isProjectDescriptionInView ? 0 : 50,
          }}
          transition={{duration: 0.6}}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis culpa
          maxime ut earum quaerat officiis sequi eos dolor, explicabo facilis
          dicta harum ex natus, maiores eligendi obcaecati atque quam quis?
        </motion.p>
      </div>
      <br />
      <div className="p-5 md:mx-20">
        <section>
          <motion.h1
            ref={projectImagesTitleRef}
            className="text-2xl mb-5 transform "
            initial={{opacity: 0, y: 50}}
            animate={{
              opacity: projectImagesTitleInView ? 1 : 0,
              y: projectImagesTitleInView ? 0 : 50,
            }}
            transition={{duration: 0.6}}
          >
            Project Images
          </motion.h1>
        </section>
        <section className="px-4 py-8 max-w-6xl  mx-auto ">
          <ImagesAlbum images={project.images} />
        </section>
      </div>
      <hr className="my-10 w-10/12 place-self-center" />
      {suggestedProject && (
        <div className="p-5 mb-10 flex justify-between flex-col md:mx-20 md:flex md:justify-evenly md:flex-row">
          <section className="mb-5 md:w-2/5">
            <Link href={`/project/${suggestedProject.title}`}>
              <h1 className="mb-5">Other Project</h1>
              <motion.img
                ref={nextProjectRef}
                src={suggestedProject.thumbnail}
                alt="Next Project Image"
                variants={variants}
                initial="hidden"
                animate={nextProjectInView ? "visible" : "hidden"}
              />
            </Link>
          </section>
          <section className=" md:w-2/5 md:flex md:flex-col md:justify-between md:my-10">
            <Link href={`/project/${suggestedProject.title}`}>
              <motion.h1
                ref={nextProjectTitleRef}
                className=" transform text-xl md:text-xl  "
                initial={{opacity: 0, y: 50}}
                animate={{
                  opacity: nextProjectTitleInView ? 1 : 0,
                  y: nextProjectTitleInView ? 0 : 50,
                }}
                transition={{duration: 0.6}}
              >
                {suggestedProject.type}
              </motion.h1>

              <motion.h1
                ref={nextProjectTitleRef}
                className="transform text-2xl tracking-wider md:text-4xl md:tracking-wider"
                initial={{opacity: 0, y: 50}}
                animate={{
                  opacity: nextProjectTitleInView ? 1 : 0,
                  y: nextProjectTitleInView ? 0 : 50,
                }}
                transition={{duration: 0.6}}
              >
                {suggestedProject.title}
              </motion.h1>
            </Link>
            <Link href={`/project/${suggestedProject.title}`}>
              <motion.p
                ref={nextProjectParRef}
                className="hidden w-fit transform md:text-4xl md:tracking-wider md:block border-b border-transparent hover:border-white transition duration-500 ease-in-out"
                initial={{opacity: 0, y: 50}}
                animate={{
                  opacity: nextProjectParInView ? 1 : 0,
                  y: nextProjectParInView ? 0 : 50,
                }}
                transition={{duration: 0.6}}
              >
                NEXT PROJECT
              </motion.p>
            </Link>
          </section>
        </div>
      )}
    </>
  );
}

export default ProjectDetailPageClient;
