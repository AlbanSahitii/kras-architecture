import React from "react";
import {Metadata} from "next";
import BlogShowClient from "./components/BlogShowClient";
import {getBlogs} from "@/app/lib/tina/queris";

interface localeType {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: localeType): Promise<Metadata> {
  const {locale} = await params;
  console.log(locale);

  return {
    title: "",
    description: "",
    openGraph: {
      title: "Projekte",
      description: "",
      url: "",
    },
    twitter: {
      card: "summary_large_image",
      title: "",
      description: "",
    },
    alternates: {
      canonical: "url",
    },
  };
}

async function BlogsServerSide() {
  const limit = 10;
  const blogs = await getBlogs({
    first: limit,
  });

  return (
    <main>
      <BlogShowClient blogs={blogs} limit={limit} />
    </main>
  );
}

export default BlogsServerSide;
