import React from "react";
import AboutClientSide from "./components/AboutClientSide";
import {getEmployees} from "../../lib/tina/queris";
import {getTranslations} from "next-intl/server";
import {Metadata} from "next";

interface localeType {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: localeType): Promise<Metadata> {
  const {locale} = await params;
  const fullUrl = `https://www.krasarchitects.com/${locale}/about`;
  const titleEnglish = "About Us";
  const titleGerman = "Über uns";
  const pageDescriptionEnglish =
    "Discover KRAS Architects, a visionary architecture studio dedicated to creating innovative, sustainable, and human-centered designs. With a commitment to excellence, we transform spaces into meaningful experiences that reflect both function and form";
  const pageDescriptionGerman =
    "KRAS Architects ist ein visionäres Architekturbüro, das innovative, nachhaltige und menschenzentrierte Designs schafft. Wir gestalten Räume mit Sinn und Qualität";

  return {
    title: locale === "en" ? titleEnglish : titleGerman,
    description:
      locale === "en" ? pageDescriptionEnglish : pageDescriptionGerman,
    openGraph: {
      type: "article",
      url: fullUrl,
      title: locale === "en" ? titleEnglish : titleGerman,
      description:
        locale === "en" ? pageDescriptionEnglish : pageDescriptionGerman,
    },
    twitter: {
      card: "summary_large_image",
      title: locale === "en" ? titleEnglish : titleGerman,
      description:
        locale === "en" ? pageDescriptionEnglish : pageDescriptionGerman,
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

async function AboutServerSide() {
  const employees = await getEmployees();
  const aboutUs = await getTranslations("AboutUs");

  return (
    <main>
      <AboutClientSide
        employees={employees}
        aboutUsTitle={aboutUs("title")}
        firstDescription={aboutUs("description.first")}
        secondDescription={aboutUs("description.second")}
        thirdDescription={aboutUs("description.third")}
        fourthDescription={aboutUs("description.fourth")}
        team={aboutUs("team")}
        titleValue={aboutUs("description.ourValues.title")}
        firstValue={aboutUs("description.ourValues.first")}
        secondValue={aboutUs("description.ourValues.second")}
        thirdValue={aboutUs("description.ourValues.third")}
        fourthValue={aboutUs("description.ourValues.fourth")}
        fifthValue={aboutUs("description.ourValues.fifth")}
        ceoDescription={aboutUs("ceoDescription")}
        partnerDescription={aboutUs("partnerDescription")}
        teamLeaderDescription={aboutUs("teamLeaderDescription")}
        supervisorDescription={aboutUs("supervisorDescription")}
        architectDescription={aboutUs("architectDescription")}
        financeDescription={aboutUs("financeDescription")}
      />
    </main>
  );
}

export default AboutServerSide;
