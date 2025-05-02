import {FetchProjectsArgs, ProjectsResponse} from "@/app/types";
import {client} from "@/tina/__generated__/client";

export const getAllProjects = async ({
  first = null,
  after = null,
}: FetchProjectsArgs) => {
  try {
    const result = await client.queries.ProjectsConnection({
      first: first,
      after: after,
    });

    const projectData = result.data.ProjectsConnection.edges?.map(p => {
      return {
        address: p?.node?.address,
        city: p?.node?.city,
        type: p?.node?.type,
        date: p?.node?.date,
        description: p?.node?.description,
        surface: p?.node?.surface,
        floors: p?.node?.floors,
        investor: p?.node?.investor,
        thumbnail: p?.node?.thumbnail,
        projectImages: p?.node?.images,
        title: p?.node?.title,
      };
    });
    return {
      projects: projectData,
      hasNextPage: result.data.ProjectsConnection.pageInfo.hasNextPage,
      endCursor: result.data.ProjectsConnection.pageInfo.endCursor,
    };
  } catch (error) {
    console.error("Failed to fetch all projects:", error);
    throw new Error(error);
  }
};

export const getProjectByTitle = async (title: string) => {
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

export const getProjectByType = async ({
  type,
  first = null,
  after = null,
}: FetchProjectsArgs) => {
  try {
    const result = await client.queries.ProjectsConnection({
      first: first,
      after: after,
      filter: {
        type: {eq: type},
      },
    });

    if (!result) {
      console.error("Project with the given title not found");
      return null;
    }
    const projectData = result.data.ProjectsConnection.edges?.map(p => {
      return {
        address: p?.node?.address,
        city: p?.node?.city,
        type: p?.node?.type,
        date: p?.node?.date,
        description: p?.node?.description,
        surface: p?.node?.surface,
        floors: p?.node?.floors,
        investor: p?.node?.investor,
        thumbnail: p?.node?.thumbnail,
        projectImages: p?.node?.images,
        title: p?.node?.title,
      };
    });

    return {
      projects: projectData,
      hasNextPage: result.data.ProjectsConnection.pageInfo.hasNextPage,
      endCursor: result.data.ProjectsConnection.pageInfo.endCursor,
    };
  } catch (error) {
    console.error("Failed to fetch project by title:", error);
    return null;
  }
};
