import MainpageClient from "./components/MainpageClient";
import {getAllProjects} from "../lib/tina/queris";
import {getTranslations} from "next-intl/server";
import {getProjectTypes} from "../lib/ProjectTypes";

export default async function MainPageServer() {
  const fetchedData = await getAllProjects({first: 5});
  const t = await getTranslations("HomePage");

  if (!fetchedData) return <p>Not Found</p>;
  const projectTypes = await getProjectTypes();
  return (
    <MainpageClient
      projectsData={fetchedData.projects}
      projectTypes={projectTypes}
      heroTitle={t("hero.title")}
      heroLearnMoreAboutUs={t("hero.learnMoreAboutUs")}
      newTitle={t("hero.newsTitle")}
    />
  );
}
