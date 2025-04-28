"use client";
import {notFound} from "next/navigation";

function ProjectDetailPageClient({project}) {
  return (
    <>
      <div>{project.description}</div>
    </>
  );
}

export default ProjectDetailPageClient;
