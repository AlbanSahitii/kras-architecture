import {notFound} from "next/navigation";
import {getProjectByTitle, getAllProjects} from "@/app/lib/tina/queris";
import ProjectDetailPageClient from "../components/ProjectDetailPageClient";
import {getTranslations} from "next-intl/server";
interface ProjectPageParams {
  params: Promise<{
    title: string;
  }>;
}

async function ProjectDetailPageServer({params}: ProjectPageParams) {
  const {title} = await params;
  const formattedParams = title.split("%20").join(" ");

  const project = await getProjectByTitle(formattedParams);
  const allProjects = await getAllProjects({});
  let suggestedProject;

  if (!project) {
    notFound();
  }

  if (allProjects.projects && allProjects.projects.length > 0) {
    const filteredProjects = allProjects.projects.filter(
      item => item?.title !== project.title
    );

    if (!filteredProjects) {
      return;
    }
    const index = Math.floor(Math.random() * (allProjects.projects.length - 1));
    suggestedProject = filteredProjects[index];
  }
  const pageMessages = await getTranslations("SingleProject");

  return (
    <ProjectDetailPageClient
      project={project}
      suggestedProject={suggestedProject}
      dateText={pageMessages("date")}
      locationText={pageMessages("location")}
      projectImagesText={pageMessages("projectImages")}
      nextProjectText={pageMessages("nextProject")}
      otherProjectText={pageMessages("otherProject")}
      surfaceText={pageMessages("surface")}
      floorsText={pageMessages("floors")}
      investorText={pageMessages("investor")}
      onGoingProject={pageMessages("onGoingProject")}
      completedProject={pageMessages("completedProject")}
      conceptualProject={pageMessages("conceptualProject")}
    />
  );
}

export default ProjectDetailPageServer;
