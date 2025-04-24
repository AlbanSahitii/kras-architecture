import MainpageClient from "./components/MainpageClient";
import {client} from "@/tina/__generated__/client";
import {ProjectsConnectionQuery} from "@/tina/__generated__/types";

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

export default async function MainPageServer() {
  const fetchedData = await getAllProjectsData();

  const projectsData = fetchedData.map(p => {
    return {
      address: p?.address,
      city: p?.city,
      type: p?.type,
      date: p?.date,
      description: p?.description,
      surface: p?.surface,
      floors: p?.floors,
      investor: p?.investor,
      thumbnail: p?.thumbnail,
      projectImages: p?.images,
      title: p?.title,
    };
  });

  return <MainpageClient projectsData={projectsData} />;
}
