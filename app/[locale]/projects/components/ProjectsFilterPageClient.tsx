import React from "react";
import ProjectTypes from "./ProjectTypes";
import ProjectShow from "./ProjectShow";
function ProjectsFilterPageClient({
  initialData,
  limit,
  type,
  projectTitle,
  allProjects,
}) {
  return (
    <>
      <ProjectTypes allProjects={allProjects} projectTitle={projectTitle} />
      <ProjectShow initialData={initialData} limit={limit} type={type} />
    </>
  );
}

export default ProjectsFilterPageClient;
