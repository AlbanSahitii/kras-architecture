import ProjectsFilterPageClient from "@/app/components/ProjectsFilterPageClient";
import React from "react";
interface ProjectPageParams {
  params: {
    type: string;
  };
}
async function ProjectsFilterServerSide({params}: ProjectPageParams) {
  const {type} = await params;
  return <ProjectsFilterPageClient type={type} />;
}

export default ProjectsFilterServerSide;
