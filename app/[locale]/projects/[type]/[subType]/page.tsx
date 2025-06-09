import {getProjectBySubType, getProjectByType} from "@/app/lib/tina/queris";
import React from "react";
import {notFound} from "next/navigation";
import {getTranslations} from "next-intl/server";
import {Metadata} from "next";
import {getProjectTypes} from "@/app/lib/ProjectTypes";
import Footer from "@/app/[locale]/components/Footer";
import ProjectsFilterPageClient from "../../components/ProjectsFilterPageClient";

interface localeType {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: localeType): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations("metaData");

  const url = `https://krasarchitects.com/${locale}/projects`;
  const englishDescription =
    "Explore the diverse portfolio of KRAS Architects, featuring innovative, sustainable, and human-centered designs across residential, commercial, and public projects. Discover our approach to modern architecture that merges functionality with aesthetics";
  const germanDescription =
    "Entdecken Sie das vielfältige Portfolio von KRAS Architects, das innovative, nachhaltige und menschenzentrierte Designs in den Bereichen Wohn-, Gewerbe- und öffentliche Projekte umfasst. Erleben Sie unseren Ansatz moderner Architektur, der Funktionalität mit Ästhetik verbindet";
  const titleEnglish = "Projects";
  const titleGerman = "Projekte";
  return {
    title: locale === "en" ? titleEnglish : titleGerman,
    keywords: t("keywords"),
    description: locale === "en" ? englishDescription : germanDescription,
    openGraph: {
      title: "Projekte",
      description: locale === "en" ? englishDescription : germanDescription,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: locale === "en" ? titleEnglish : titleGerman,
      description: locale === "en" ? englishDescription : germanDescription,
    },
    alternates: {
      canonical: url,
    },
  };
}

interface ProjectPageParams {
  params: Promise<{
    type: string;
    subType: string;
  }>;
}

async function ProjectsFilterServerSide({params}: ProjectPageParams) {
  const first = 9;
  const {type, subType} = await params;
  const initialData = await getProjectBySubType({subType, first});
  console.log(initialData);
  const projectMessages = await getTranslations("Projects");

  if (initialData?.projects?.length === 0) notFound();
  const projectTypes = await getProjectTypes();
  return (
    <>
      <main>
        <ProjectsFilterPageClient
          key={type}
          projectTypes={projectTypes}
          initialData={initialData}
          limit={first}
          type={type}
          subType={subType}
          projectTitle={projectMessages("projectTitle")}
          allProjects={projectMessages("all")}
        />
      </main>
      <Footer />
    </>
  );
}

export default ProjectsFilterServerSide;
