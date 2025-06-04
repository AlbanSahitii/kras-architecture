"use client";
import React, {useEffect} from "react";
import {motion, useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {ArrowDownRight} from "lucide-react";
import Link from "next/link";
import {seededRandomColor} from "@/app/lib/seededRandomColor";
import {useParams} from "next/navigation";
import Image from "next/image";
function ProjectCard({project}) {
  const params = useParams();
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
      className="relative  w-2/5 h-52 m-2 md:my-5 md:mx-1 md:w-[30%] md:h-96 overflow-hidden"
    >
      <Link href={`/${params!.locale}/project/${project.title}`}>
        <div className="w-full h-full relative z-0">
          <Image
            src={project.thumbnail}
            className="w-full h-full object-cover opacity-60"
            alt={project.title}
            fill
            quality={75}
          />
          <p className="text-xs absolute top-2 left-2 md:top-4 md:left-3 md:text-xl md:tracking-wider text-white">
            {params!.locale === "en" ? project.type : project.germanType}
          </p>
          <p className="text-xs absolute top-6 left-2 md:top-14 md:left-3 md:text-2xl md:tracking-widest text-white">
            {params!.locale === "en" ? project.title : project.germanTitle}
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
