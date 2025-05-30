import {getAllProjects} from "../lib/tina/queris";

export default async function sitemap() {
  const url = "https://krasarchitects.com";
  const projects = await getAllProjects({});
  let projectFormatedGerman;
  let projectFormatedEnglish;
  if (!projects.projects) {
    projectFormatedGerman = null;
    projectFormatedEnglish = null;
    return;
  } else {
    projectFormatedGerman = projects.projects.map(p => {
      return {
        url: `${url}/de/project/${p.title}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      };
    });
    projectFormatedEnglish = projects.projects.map(p => {
      return {
        url: `${url}/en/project/${p.title}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      };
    });
  }

  return [
    {
      url: `${url}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${url}/de/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${url}/en/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectFormatedGerman,
    ...projectFormatedEnglish,
  ];
}
