import React from "react";
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

async function BlogsServerSideTitle() {
  return <main></main>;
}

export default BlogsServerSideTitle;
