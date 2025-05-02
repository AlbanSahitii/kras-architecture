"use client";
import React from "react";
import ProjectTypes from "./ProjectTypes";
import ProjectShow from "./ProjectShow";

function ProjectsPageClient({initialData, limit}) {
  return (
    <>
      <ProjectTypes />
      <ProjectShow initialData={initialData} limit={limit} />
    </>
  );
}

export default ProjectsPageClient;
