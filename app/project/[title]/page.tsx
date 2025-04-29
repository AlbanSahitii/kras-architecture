import ProjectDetailPageClient from "@/app/components/ProjectDetailPageClient";
import {client} from "@/tina/__generated__/client";
import {notFound} from "next/navigation";

interface ProjectPageParams {
  params: {
    title: string;
  };
}

const getProjectByTitle = async (title: string) => {
  try {
    const result = await client.queries.ProjectsConnection({
      filter: {
        title: {eq: title},
      },
    });

    const project = result.data?.ProjectsConnection?.edges?.[0]?.node;

    if (!project) {
      console.error("Project with the given title not found");
      return null;
    }

    return project;
  } catch (error) {
    console.error("Failed to fetch project by title:", error);
    return null;
  }
};

const getAllProjectsData = async () => {
  try {
    const result = await client.queries.ProjectsConnection();

    const projectsList =
      result.data.ProjectsConnection?.edges?.map(edge => edge?.node) || [];

    return projectsList;
  } catch (error) {
    console.error("Failed to fetch all projects:", error);
    return [];
  }
};

async function ProjectDetailPageServer({params}: ProjectPageParams) {
  const {title} = await params;
  const formattedParams = title.split("%20").join(" ");
  const project = await getProjectByTitle(formattedParams);
  const allProjects = await getAllProjectsData();
  let suggestedProject;

  if (!project) {
    notFound();
  }

  if (allProjects && allProjects.length > 0) {
    const filteredProjects = allProjects.filter(
      item => item?.title !== project.title
    );

    if (!filteredProjects) {
      return;
    }
    const index = Math.floor(Math.random() * (allProjects.length - 1));
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
