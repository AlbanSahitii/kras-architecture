import ProjectsFilterPageClient from "../components/ProjectsFilterPageClient";
import {getProjectByType} from "@/app/lib/tina/queris";
import React from "react";
import {notFound} from "next/navigation";
import {getTranslations} from "next-intl/server";
interface ProjectPageParams {
  params: Promise<{
    type: string;
  }>;
}
async function ProjectsFilterServerSide({params}: ProjectPageParams) {
  const first = 9;
  const {type} = await params;
  const initialData = await getProjectByType({type, first});
  const projectMessages = await getTranslations("Projects");

  if (initialData?.projects?.length === 0) notFound();
  return (
    <ProjectsFilterPageClient
      key={type}
      initialData={initialData}
      limit={first}
      type={type}
      projectTitle={projectMessages("projectTitle")}
      allProjects={projectMessages("all")}
    />
  );
}

export default ProjectsFilterServerSide;
