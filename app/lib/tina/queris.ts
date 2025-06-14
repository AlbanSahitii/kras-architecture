import {client} from "@/tina/__generated__/client";
import {notFound} from "next/navigation";

export interface FetchProjectsArgs {
  type?: string;
  subType?: string | null;
  first?: number | null;
  after?: string | null | undefined;
  mainPage?: boolean;
}

export interface Employee {
  fullName: string | undefined;
  role: string | null | undefined;
  germanRole: string | null | undefined;
  thumbnail: string | undefined;
  description: string | undefined;
  germanDescription: string | undefined;
}

export const getAllProjects = async ({
  first = null,
  after = null,
  mainPage,
}: FetchProjectsArgs) => {
  try {
    let filters;
    if (mainPage) {
      filters = {
        mainPage: {eq: mainPage},
      };
    }
    const result = await client.queries.ProjectsConnection({
      first: first,
      after: after,
      filter: filters,
    });

    const projectData = result.data.ProjectsConnection.edges?.map(p => {
      return {
        address: p?.node?.address,
        city: p?.node?.city,
        type: p?.node?.type,
        date: p?.node?.date,
        description: p?.node?.description,
        germanDescription: p?.node?.germanDescription,
        thumbnail: p?.node?.thumbnail,
        thumbnailMobile: p?.node?.thumbnailMobile,
        subType: p?.node?.subType,
        projectImages: p?.node?.images,
        phase: p?.node?.phase,
        title: p?.node?.title,
        germanTitle: p?.node?.germanTitle,
        germanTitleDescription: p?.node?.germanTitleDescription,
        titleDescription: p?.node?.titleDescription,
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
      return notFound();
    }
    const projectData = result.data.ProjectsConnection.edges?.map(p => {
      return {
        address: p?.node?.address,
        city: p?.node?.city,
        type: p?.node?.type,
        date: p?.node?.date,
        description: p?.node?.description,
        germanDescription: p?.node?.germanDescription,
        architectureSubType: p?.node?.subType,
        thumbnail: p?.node?.thumbnail,
        thumbnailMobile: p?.node?.thumbnailMobile,
        projectImages: p?.node?.images,
        phase: p?.node?.phase,
        title: p?.node?.title,
        germanTitle: p?.node?.germanTitle,
        germanTitleDescription: p?.node?.germanTitleDescription,
        titleDescription: p?.node?.titleDescription,
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
export const getProjectBySubType = async ({
  subType,
  first = null,
  after = null,
}: FetchProjectsArgs) => {
  subType = subType?.toLowerCase();
  try {
    const result = await client.queries.ProjectsConnection({
      first: first,
      after: after,
      filter: {
        subType: {eq: subType},
      },
    });

    if (!result) {
      console.error("Project with the given title not found");
      return notFound();
    }
    const projectData = result.data.ProjectsConnection.edges?.map(p => {
      return {
        address: p?.node?.address,
        city: p?.node?.city,
        type: p?.node?.type,
        date: p?.node?.date,
        description: p?.node?.description,
        germanDescription: p?.node?.germanDescription,
        architectureSubType: p?.node?.subType,
        thumbnail: p?.node?.thumbnail,
        thumbnailMobile: p?.node?.thumbnailMobile,
        projectImages: p?.node?.images,
        phase: p?.node?.phase,
        title: p?.node?.title,
        germanTitle: p?.node?.germanTitle,
        germanTitleDescription: p?.node?.germanTitleDescription,
        titleDescription: p?.node?.titleDescription,
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

export const getEmployees = async () => {
  try {
    const result = await client.queries.EmployeesConnection();

    if (!result) {
      console.error("Employees not found");
      return notFound();
    }

    const ceo: Employee[] = [];
    const partners: Employee[] = [];
    const teamLeader: Employee[] = [];
    const superVisors: Employee[] = [];
    const architects: Employee[] = [];
    const finance: Employee[] = [];

    result.data.EmployeesConnection.edges?.forEach(emp => {
      const employee: Employee = {
        fullName: emp?.node?.full_Name,
        role: emp?.node?.role,
        germanRole: emp?.node?.germanRole,
        description: emp?.node?.description,
        germanDescription: emp?.node?.germanDescription,
        thumbnail: emp?.node?.thumbnail,
      };

      switch (emp?.node?.role) {
        case "Ceo":
          ceo.push(employee);
          break;
        case "Partner":
          partners.push(employee);
          break;
        case "Team Leader":
          teamLeader.push(employee);
          break;
        case "Supervisor":
          superVisors.push(employee);
          break;
        case "Architect":
          architects.push(employee);
          break;
        case "Finance":
          finance.push(employee);
          break;
      }
    });

    return {ceo, partners, teamLeader, superVisors, architects, finance};
  } catch (error) {
    console.error("Failed to fetch project by title:", error);
    return notFound();
  }
};

interface blogType {
  first?: number | null | undefined;
  after?: string | null | undefined;
}

export const getBlogs = async ({first = null, after = null}: blogType) => {
  try {
    const result = await client.queries.BlogsConnection({
      first: first,
      after: after,
    });

    const blogData = result.data.BlogsConnection.edges?.map(p => {
      return {
        title: p?.node?.title,
        germanTitle: p?.node?.germanTitle,
        description: p?.node?.description,
        germanDescription: p?.node?.germanDescription,
        type: p?.node?.type,
        germanType: p?.node?.germanType,
        date: p?.node?.date,
        thumbnail: p?.node?.thumbnail,
      };
    });
    return {
      blogData: blogData,
      hasNextPage: result.data.BlogsConnection.pageInfo.hasNextPage,
      endCursor: result.data.BlogsConnection.pageInfo.endCursor,
    };
  } catch (error) {
    console.error("Failed to fetch all blogs:", error);
    throw new Error(error);
  }
};

export const getBlogByTitle = async (title: string) => {
  try {
    const result = await client.queries.BlogsConnection({
      filter: {
        title: {eq: title},
      },
    });

    const blog = result.data?.BlogsConnection?.edges?.[0]?.node;

    if (!blog) {
      console.error("blog with the given title not found");
      return notFound();
    }

    return blog;
  } catch (error) {
    console.error("Failed to fetch blog by title:", error);
    return null;
  }
};
