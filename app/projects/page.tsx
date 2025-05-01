import React from "react";
import ProjectsPageClient from "../components/ProjectsPageClient";
import {getAllProjects} from "../lib/tina/queris";

async function ProjectsServerSide() {
  const limit = 9;
  const fetchedData = await getAllProjects({first: limit});
  return <ProjectsPageClient initialData={fetchedData} limit={limit} />;
}

export default ProjectsServerSide;
