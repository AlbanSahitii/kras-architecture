import {notFound} from "next/navigation";
import {getProjectByTitle, getAllProjects} from "@/app/lib/tina/queris";
import ProjectDetailPageClient from "../components/ProjectDetailPageClient";
import {getTranslations} from "next-intl/server";
import {Metadata} from "next";
import Footer from "../../components/Footer";
import {getProjectTypes} from "@/app/lib/ProjectTypes";
interface ProjectPageParams {
  params: Promise<{
    title: string;
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectPageParams): Promise<Metadata> {
  const {title, locale} = await params;
  const formattedTitle = decodeURIComponent(title);
  const project = await getProjectByTitle(formattedTitle);

  if (!project) notFound();

  const siteUrl = "https://krasarchitects.com";
  const imageUrl = project.thumbnail
    ? `${siteUrl}${project.thumbnail}`
    : undefined;
  const pageTitle = locale === "en" ? project.title : project.germanTitle;
  const pageDescription =
    locale === "en" ? project.germanDescription : project.description;
  const fullUrl = `${siteUrl}/projects/${title}`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      type: "article",
      url: fullUrl,
      title: pageTitle,
      description: pageDescription,
      images: imageUrl ? [{url: imageUrl}] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

async function ProjectDetailPageServer({params}: ProjectPageParams) {
  const {title} = await params;
  const formattedParams = title.split("%20").join(" ");

  const project = await getProjectByTitle(formattedParams);
  const allProjects = await getAllProjects({});
  let suggestedProject;

  if (!project) {
    notFound();
  }

  if (allProjects.projects && allProjects.projects.length > 0) {
    const filteredProjects = allProjects.projects.filter(
      item => item?.title !== project.title
    );

    if (!filteredProjects) {
      return;
    }
    const index = Math.floor(Math.random() * (allProjects.projects.length - 1));
    suggestedProject = filteredProjects[index];
  }
  const pageMessages = await getTranslations("SingleProject");
  const projectTypes = await getProjectTypes();
  return (
    <>
      <main>
        <ProjectDetailPageClient
          projectTypes={projectTypes}
          project={project}
          suggestedProject={suggestedProject}
          dateText={pageMessages("date")}
          locationText={pageMessages("location")}
          nextProjectText={pageMessages("nextProject")}
          otherProjectText={pageMessages("otherProject")}
          surfaceText={pageMessages("surface")}
          floorsText={pageMessages("floors")}
          investorText={pageMessages("investor")}
          onGoingProject={pageMessages("onGoingProject")}
          completedProject={pageMessages("completedProject")}
          conceptualProject={pageMessages("conceptualProject")}
        />
      </main>
      <Footer />
    </>
  );
}

export default ProjectDetailPageServer;
