export interface ProjectsResponse {
  projects: [];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null | undefined;
  };
}
