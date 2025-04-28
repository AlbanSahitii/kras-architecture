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
async function ProjectDetailPageServer({params}: ProjectPageParams) {
  const {title} = await params;
  const formattedParams = title.split("%20").join(" ");
  const project = await getProjectByTitle(formattedParams);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPageClient project={project} />;
}

export default ProjectDetailPageServer;
