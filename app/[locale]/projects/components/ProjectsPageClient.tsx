"use client";
import React from "react";
import ProjectTypes from "./ProjectTypes";
import ProjectShow from "./ProjectShow";

function ProjectsPageClient({initialData, limit, allProjects, projectTitle}) {
  return (
    <>
      <ProjectTypes allProjects={allProjects} projectTitle={projectTitle} />
      <ProjectShow initialData={initialData} limit={limit} />
    </>
  );
}

export default ProjectsPageClient;
