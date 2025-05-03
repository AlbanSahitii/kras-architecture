export interface ProjectsResponse {
  projects: [];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null | undefined;
  };
}

export interface FetchProjectsArgs {
  type?: string;
  first?: number | null;
  after?: string | null | undefined;
}

export interface Employee {
  fullName: string | undefined;
  role: string | null | undefined;
  thumbnail: string | undefined;
  description: string | undefined;
}
