"use client";
import Link from "next/link";
import {useParams} from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ProjectTypes({allProjects, projectTitle, projectTypes}) {
  const params = useParams();
  return (
    <>
      <section id="page0" className="">
        <h1 className="text-4xl pt-32 mx-10 mb-9">{projectTitle}</h1>
      </section>
      <div className="w-full pb-10 ">
        <section className="flex justify-evenly mx-10 md:flex md:justify-start overflow-x-auto  scrollbar-none">
          <div>
            <Link href={`/${params!.locale}/projects`}>
              <p className="text-sm md:text-xl  mx-5">{allProjects}</p>
            </Link>
          </div>

          <div className="text-sm md:text-xl mx-5 ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="cursor-pointer">
                  {projectTypes.architecturalDesign.type}
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                  <Link
                    className="cursor-pointer"
                    href={`/${params!.locale}/projects/architecturalDesign`}
                  >
                    <DropdownMenuItem className="cursor-pointer">{`All ${[
                      projectTypes.architecturalDesign.type,
                    ]}`}</DropdownMenuItem>
                  </Link>
                  <Link
                    href={`/${
                      params!.locale
                    }/projects/architecturalDesign/Housing`}
                  >
                    <DropdownMenuItem className="cursor-pointer">{`${
                      params!.locale === "en" ? "Housing" : "Wohnbau"
                    }`}</DropdownMenuItem>
                  </Link>
                  <Link
                    href={`/${
                      params!.locale
                    }/projects/architecturalDesign/Commercial`}
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      {`${
                        params!.locale === "en" ? "Commercial" : "Gewerbebau"
                      }`}
                    </DropdownMenuItem>
                  </Link>
                  <Link
                    href={`/${
                      params!.locale
                    }/projects/architecturalDesign/Competition`}
                  >
                    <DropdownMenuItem className="cursor-pointer">{`${
                      params!.locale === "en" ? "Competition" : "Wettbewerb"
                    }`}</DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <Link href={`/${params!.locale}/projects/landscapeDesign`}>
              <p className="text-sm md:text-xl md:mx-11">
                {projectTypes.landscapeDesign.type}
              </p>
            </Link>
          </div>

          <div>
            <Link href={`/${params!.locale}/projects/interiorDesign`}>
              <p className="text-sm md:text-xl mx-5">
                {projectTypes.interiorDesign.type}
              </p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default ProjectTypes;
