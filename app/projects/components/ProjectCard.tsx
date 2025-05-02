"use client";
import React, {useEffect} from "react";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {ArrowDownRight} from "lucide-react";
import Link from "next/link";

function seededRandomColor(seed) {
  const colors = [
    "#FCF259",
    "#4A102A",
    "#85193C",
    "#C5172E",
    "#FFF700",
    "#B80F28",
    "#670E36",
    "#D9230F",
    "#3D0D24",
    "#FFDA61",
    "#A73730",
    "#9B2335",
    "#2E0817",
    "#FFC857",
  ];

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

function ProjectCard({project}) {
  const bgColor = seededRandomColor(project.title);
  const controls = useAnimation();
  const {ref, inView} = useInView({triggerOnce: true});

  useEffect(() => {
    if (inView) {
      controls.start({
        clipPath: "inset(100% 0% 0% 0%)",
        transition: {
          duration: 1.5,
          ease: "easeInOut",
        },
      });
    } else {
      controls.set({clipPath: "inset(0% 0% 0% 0%)"});
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className="relative w-2/5 h-52 m-2 md:my-5 md:mx-1 md:w-[30%] md:h-96 overflow-hidden"
    >
      <Link href={`/project/${project.title}`}>
        <div className="w-full h-full relative z-0">
          <img
            src={project.thumbnail}
            className="w-full h-full object-cover opacity-60"
            alt={project.title}
          />
          <p className="text-xs absolute top-2 left-2 md:top-4 md:left-3 md:text-xl md:tracking-wider text-white">
            {project.type}
          </p>
          <p className="text-xs absolute top-6 left-2 md:top-14 md:left-3 md:text-2xl md:tracking-widest text-white">
            {project.title}
          </p>
          <ArrowDownRight className="absolute bottom-1 right-1 md:right-1 md:bottom-1 md:h-11 md:w-auto text-white" />
        </div>

        <motion.div
          animate={controls}
          initial={false}
          style={{
            backgroundColor: bgColor,
            clipPath: "inset(0% 0% 0% 0%)",
          }}
          className="absolute top-0 left-0 w-full h-full z-10"
        />
      </Link>
    </motion.div>
  );
}

export default ProjectCard;
