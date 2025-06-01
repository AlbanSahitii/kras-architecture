import {getAllProjects, getBlogs} from "../lib/tina/queris";

export default async function sitemap() {
  const url = "https://krasarchitects.com";
  const projects = await getAllProjects({});
  const blogs = await getBlogs({});
  let projectFormatedGerman;
  let projectFormatedEnglish;
  let blogsFormatedEnglish;
  let blogsFormatedGerman;
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

  if (!blogs.blogData) {
    blogsFormatedEnglish = null;
    blogsFormatedGerman = null;
  } else {
    blogsFormatedEnglish = blogs.blogData.map(b => {
      return {
        url: `${url}/en/blog/${b.title}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      };
    });

    blogsFormatedGerman = blogs.blogData.map(b => {
      return {
        url: `${url}/de/blog/${b.title}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
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
    ...blogsFormatedEnglish,
    ...blogsFormatedGerman,
  ];
}
