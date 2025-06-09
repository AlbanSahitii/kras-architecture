"use client";
import React from "react";
import ProjectTypes from "./ProjectTypes";
import ProjectShow from "./ProjectShow";

function ProjectsPageClient({
  initialData,
  limit,
  allProjects,
  projectTitle,
  projectTypes,
}) {
  return (
    <>
      <ProjectTypes
        allProjects={allProjects}
        projectTitle={projectTitle}
        projectTypes={projectTypes}
      />
      <ProjectShow
        initialData={initialData}
        limit={limit}
        subType={""}
        projectTypes={projectTypes}
      />
    </>
  );
}

export default ProjectsPageClient;
