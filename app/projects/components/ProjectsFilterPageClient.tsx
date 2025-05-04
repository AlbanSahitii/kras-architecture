import React from "react";
import ProjectTypes from "./ProjectTypes";
import ProjectShow from "./ProjectShow";
function ProjectsFilterPageClient({initialData, limit, type}) {
  console.log("-----");
  console.log("pageclient");
  console.log(initialData);
  console.log("-----");
  return (
    <>
      <ProjectTypes />
      <ProjectShow initialData={initialData} limit={limit} type={type} />
    </>
  );
}

export default ProjectsFilterPageClient;
