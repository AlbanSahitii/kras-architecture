import ProjectDetailPageClient from "@/app/components/ProjectDetailPageClient";
import {notFound} from "next/navigation";
import {getProjectByTitle, getAllProjects} from "@/app/lib/tina/queris";
interface ProjectPageParams {
  params: {
    title: string;
  };
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

  return (
    <ProjectDetailPageClient
      project={project}
      suggestedProject={suggestedProject}
    />
  );
}

export default ProjectDetailPageServer;
