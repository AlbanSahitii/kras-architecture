import MainpageClient from "./components/MainpageClient";
import {getAllProjects} from "./lib/tina/queris";

export default async function MainPageServer() {
  const fetchedData = await getAllProjects({first: 5});

  return <MainpageClient projectsData={fetchedData.projects} />;
}
