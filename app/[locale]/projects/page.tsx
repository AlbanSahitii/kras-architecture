import React from "react";
import ProjectsPageClient from "./components/ProjectsPageClient";
import {getAllProjects} from "../../lib/tina/queris";
import {getTranslations} from "next-intl/server";
import {projectEntrypointsSubscribe} from "next/dist/build/swc/generated-native";

async function ProjectsServerSide() {
  const limit = 9;
  const fetchedData = await getAllProjects({first: limit});

  const projectMessages = await getTranslations("Projects");

  return (
    <ProjectsPageClient
      initialData={fetchedData}
      limit={limit}
      projectTitle={projectMessages("projectTitle")}
      allProjects={projectMessages("all")}
    />
  );
}

export default ProjectsServerSide;
