import React from "react";
import ProjectTypes from "./ProjectTypes";
import ProjectShow from "./ProjectShow";
function ProjectsFilterPageClient({
  initialData,
  subType,
  limit,
  type,
  projectTitle,
  allProjects,
  projectTypes,
}) {
  return (
    <>
      <ProjectTypes
        projectTypes={projectTypes}
        allProjects={allProjects}
        projectTitle={projectTitle}
      />
      <ProjectShow
        initialData={initialData}
        limit={limit}
        subType={subType}
        type={type}
        projectTypes={projectTypes}
      />
    </>
  );
}

export default ProjectsFilterPageClient;
