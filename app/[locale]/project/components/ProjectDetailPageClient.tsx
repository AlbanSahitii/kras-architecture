"use client";
import Link from "next/link";
import {useEffect, useRef} from "react";
import {useInView, motion} from "framer-motion";
import ImagesAlbum from "./ImagesAlbum";
import {useParams} from "next/navigation";
function ProjectDetailPageClient({
  project,
  suggestedProject,
  dateText,
  locationText,
  projectImagesText,
  nextProjectText,
  otherProjectText,
  surfaceText,
  floorsText,
  investorText,
  onGoingProject,
  completedProject,
  conceptualProject,
}) {
  const params = useParams();
  let projectType = "";
  if (project.phase) {
    if (project.phase === "Completed") {
      projectType = completedProject;
    } else if (project.phase === "On-Going") {
      projectType = onGoingProject;
    } else if (project.phase === "Conceptual") {
      projectType = conceptualProject;
    }
  }

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
      <div className=" px-3 pt-40 md:px-20 snap-start">
        <section className="">
          <h2 className="tracking-wide text-sm md:text-2xl">
            {params!.locale === "en" ? project.type : project.germanType}
          </h2>
          <h1 className="text-2xl md:text-8xl tracking-wider">
            {params!.locale === "en" ? project.title : project.germanTitle}
          </h1>
        </section>
        <section className="mt-5 flex justify-center flex-col md:flex-row md:justify-between md:px-2">
          <div
            id="page0"
            className="flex justify-start flex-wrap md:h-2/3  md:pt-32 md:w-1/5"
          >
            {project.date && (
              <div className="mr-6 mt-4">
                <p className="text-sm">{dateText}</p>
                <p className="text-xl">{project.date}</p>
              </div>
            )}
            {project.city && (
              <div className="mr-6 mt-4">
                <p className="text-sm">{locationText}</p>
                <p className="text-xl">{project.city}</p>
              </div>
            )}

            {project.surface && (
              <div className="mr-6 mt-4">
                <p className="text-sm">{surfaceText}</p>
                <p className="text-xl">{project.surface}</p>
              </div>
            )}
            {project.investor && (
              <div className="mr-6 mt-4">
                <p className="text-sm">{investorText}</p>
                <p className="text-xl">{project.investor}</p>
              </div>
            )}
            {project.floors && (
              <div className="mr-6 mt-4">
                <p className="text-sm">{floorsText}</p>
                <p className="text-xl">{project.floors}</p>
              </div>
            )}
            {projectType.length > 1 && (
              <div className="mr-6 mt-4">
                <p className="text-sm">Phase</p>
                <p className="text-xl">{projectType}</p>
              </div>
            )}
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

      <div className="p-5 md:mx-60 snap-start">
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
          {params!.locale === "en"
            ? project.titleDescription
            : project.germanTitleDescription}
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
          {project.description}
        </motion.p>
      </div>
      <br />
      <div className="p-5 md:mx-20 snap-start">
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
            {projectImagesText}
          </motion.h1>
        </section>
        <section className="px-4 py-8 max-w-6xl  mx-auto snap-start">
          <ImagesAlbum images={project.images} />
        </section>
      </div>
      <hr className="my-10 w-10/12 place-self-center" />
      {suggestedProject && (
        <div className="p-5 mb-10 flex justify-between flex-col md:mx-20 md:flex md:justify-evenly md:flex-row snap-start">
          <section className="mb-5 md:w-2/5">
            <Link href={`/${params!.locale}/project/${suggestedProject.title}`}>
              <h1 className="mb-5">{otherProjectText}</h1>
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
          <section className=" md:w-2/5 md:flex md:flex-col md:justify-between md:my-10 snap-start">
            <Link href={`/${params!.locale}/project/${suggestedProject.title}`}>
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
                {params!.locale === "en"
                  ? suggestedProject.type
                  : suggestedProject.germanType}
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
                {params!.locale === "en"
                  ? suggestedProject.title
                  : suggestedProject.germanTitle}
              </motion.h1>
            </Link>
            <Link href={`/${params!.locale}/project/${suggestedProject.title}`}>
              <motion.p
                ref={nextProjectParRef}
                className="hidden w-fit transform md:text-4xl md:tracking-wider md:block border-b border-transparent hover:border-white transition duration-500 ease-in-out snap-start"
                initial={{opacity: 0, y: 50}}
                animate={{
                  opacity: nextProjectParInView ? 1 : 0,
                  y: nextProjectParInView ? 0 : 50,
                }}
                transition={{duration: 0.6}}
              >
                {nextProjectText}
              </motion.p>
            </Link>
          </section>
        </div>
      )}
    </>
  );
}

export default ProjectDetailPageClient;
