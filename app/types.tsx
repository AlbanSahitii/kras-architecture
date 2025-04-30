export interface ProjectsResponse {
  projects: [];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null | undefined;
  };
}

export interface FetchProjectsArgs {
  first?: number | null;
  after?: string | null | undefined;
}
