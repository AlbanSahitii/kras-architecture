"use client";
import Link from "next/link";
import {useEffect, useRef} from "react";
import {useInView, motion} from "framer-motion";
import {useParams} from "next/navigation";
import Image from "next/image";
function ProjectDetailPageClient({
  projectTypes,
  project,
  suggestedProject,
  dateText,
  locationText,
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
      },
    },
  };
  const imagesReversed = project.images.slice().reverse();
  return (
    <>
      <div className="bg-white text-black min-h-screen">
        <div className=" px-3 pt-40 md:px-20 ">
          <section className="">
            <h2 className="tracking-wide text-sm md:text-2xl">
              {projectTypes[project.type].type}
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
              {project.subType && (
                <div className="mr-6 mt-4">
                  <p className="text-sm">Type</p>
                  {/* this shouldnt be like this. fix later */}
                  <p className="text-xl">
                    {params!.locale === "en"
                      ? project.subType.charAt(0).toUpperCase() +
                        project.subType.slice(1)
                      : project.subType === "housing"
                      ? "Wohnbau"
                      : project.subType === "commercial"
                      ? "Gewerbebau"
                      : project.subType === "competition"
                      ? "Wettbewerb"
                      : ""}
                  </p>
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
            <div className="md:ml-10 md:min-w-3/5 flex justify-center  mt-5 md:mt-0">
              <motion.img
                alt="thumbnail"
                className="w-full h-auto md:h-[700px] object-cover rounded-lg"
                src={project.thumbnail}
              />
            </div>
          </section>
        </div>
        <div className="px-5 md:mx-60  mt-16">
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

          {params!.locale === "en"
            ? project?.description.children.map((description, i) => (
                <motion.p
                  key={i}
                  ref={projectDescriptionRef}
                  className="transform my-7 "
                  initial={{opacity: 0, y: 50}}
                  animate={{
                    opacity: isProjectDescriptionInView ? 1 : 0,
                    y: isProjectDescriptionInView ? 0 : 50,
                  }}
                  transition={{duration: 0.6}}
                >
                  {description.children[0].text}
                </motion.p>
              ))
            : project?.germanDescription.children.map((description, i) => (
                <motion.p
                  key={i}
                  ref={projectDescriptionRef}
                  className="transform my-7"
                  initial={{opacity: 0, y: 50}}
                  animate={{
                    opacity: isProjectDescriptionInView ? 1 : 0,
                    y: isProjectDescriptionInView ? 0 : 50,
                  }}
                  transition={{duration: 0.6}}
                >
                  {description.children[0].text}
                </motion.p>
              ))}
        </div>
        <div className="px-5 md:mx-20 lg:mx-96  flex flex-col items-center ">
          {imagesReversed.map((image, i) => (
            <div key={i} className="w-full ">
              <Image
                src={image.image}
                alt=""
                className="w-full h-auto"
                layout="responsive"
                width={0}
                height={0}
                quality={75}
                sizes="100vw"
              />
              {image.type || image.germanType ? (
                <p className="text-black/30">
                  {params!.locale === "en" ? image.type : image.germanType}
                </p>
              ) : null}
              {params!.locale === "en" ? (
                <h3 className="text-2xl mt-7">{image.photoDescriptionTitle}</h3>
              ) : (
                <h3 className="text-2xl mt-7">
                  {image.photoDescriptionTitleGerman}
                </h3>
              )}
              {params!.locale === "en" && image.description
                ? image?.description.children.map((description, i) => (
                    <p key={i} className="transform mt-2 mb-6 ">
                      {description.children[0].text}
                    </p>
                  ))
                : image?.germanDescription.children.map((description, i) => (
                    <p key={i} className="transform mt-2 mb-6">
                      {description.children[0].text}
                    </p>
                  ))}
            </div>
          ))}
        </div>
        {suggestedProject && (
          <div className="p-5  flex justify-between flex-col md:mx-20 md:flex md:justify-evenly md:flex-row ">
            <section className="mb-5 md:w-2/5">
              <Link
                href={`/${params!.locale}/project/${suggestedProject.title}`}
              >
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
            <section className=" md:w-2/5 md:flex md:flex-col md:justify-between md:my-10 ">
              <Link
                href={`/${params!.locale}/project/${suggestedProject.title}`}
              >
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
                  {projectTypes[project.type].type}
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
              <Link
                href={`/${params!.locale}/project/${suggestedProject.title}`}
              >
                <motion.p
                  ref={nextProjectParRef}
                  className="hidden w-fit transform md:text-4xl md:tracking-wider md:block border-b border-transparent hover:border-white transition duration-500 ease-in-out "
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
      </div>
    </>
  );
}

export default ProjectDetailPageClient;
