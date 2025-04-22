import MainpageClient from "./components/MainpageClient";
import {client} from "@/tina/__generated__/client"; // Imports the TinaCMS client instance
import {ProjectsConnectionQuery} from "@/tina/__generated__/types"; // Imports the generated type for your projects query

const getAllProjectsData = async () => {
  console.log("Fetching all projects data...");

  try {
    const result = await client.queries.ProjectsConnection();

    const projectsList =
      result.data.ProjectsConnection?.edges?.map(edge => edge?.node) || [];

    return projectsList;
  } catch (error) {
    console.error("Failed to fetch all projects:", error);
    return []; // Return an empty array or handle error
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
