"use client";
import Link from "next/link";
import {useParams} from "next/navigation";
import React from "react";

function ProjectTypes({allProjects, projectTitle}) {
  const params = useParams();
  return (
    <>
      <section id="page0">
        <h1 className="text-4xl pt-40 mx-10 mb-9">{projectTitle}</h1>
      </section>
      <div className="w-full pb-10">
        <section className="flex justify-between mx-10 md:flex md:justify-start">
          <Link href={`/${params!.locale}/projects`}>
            <p className="text-sm md:text-xl md:mx-5">{allProjects}</p>
          </Link>
          <Link href={`/${params!.locale}/projects/Comercial`}>
            <p className="text-sm md:text-xl md:mx-5">
              {params!.locale === "en" ? "Comercial" : "Kommerziell"}
            </p>
          </Link>
          <Link href={`/${params!.locale}/projects/Residental`}>
            <p className="text-sm md:text-xl md:mx-5">
              {params!.locale === "en" ? "Residental" : "Wohnsitz"}
            </p>
          </Link>
          <Link href={`/${params!.locale}/projects/Competition`}>
            <p className="text-sm md:text-xl md:mx-5">
              {params!.locale === "en" ? "Competition" : "Wettbewerb"}
            </p>
          </Link>
        </section>
      </div>
    </>
  );
}

export default ProjectTypes;
