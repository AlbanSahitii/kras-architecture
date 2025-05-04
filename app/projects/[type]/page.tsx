import ProjectsFilterPageClient from "@/app/projects/components/ProjectsFilterPageClient";
import {getProjectByType} from "@/app/lib/tina/queris";
import React from "react";
import {notFound} from "next/navigation";
interface ProjectPageParams {
  params: Promise<{
    type: string;
  }>;
}
async function ProjectsFilterServerSide({params}: ProjectPageParams) {
  const first = 9;
  const {type} = await params;
  const initialData = await getProjectByType({type, first});

  if (initialData?.projects?.length === 0) notFound();
  return (
    <ProjectsFilterPageClient
      key={type}
      initialData={initialData}
      limit={first}
      type={type}
    />
  );
}

export default ProjectsFilterServerSide;
