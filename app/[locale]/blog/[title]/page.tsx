import React from "react";
import {Metadata} from "next";
import {getBlogByTitle} from "@/app/lib/tina/queris";
import {notFound} from "next/navigation";
import Image from "next/image";
import Head from "next/head";
import {getTranslations} from "next-intl/server";

interface props {
  params: Promise<{
    locale: string;
    title: string;
  }>;
}

export async function generateMetadata({params}: props): Promise<Metadata> {
  const {locale, title} = await params;
  const blog = await getBlogByTitle(decodeURIComponent(title));
  const t = await getTranslations("metaData");

  if (!blog) {
    return {
      title: "Blog Not Found",
      keywords: t("keywords"),
      description: "The requested blog post could not be found.",
      openGraph: {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
        url: "",
        images: [],
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      },
      alternates: {
        canonical: "",
      },
    };
  }

  const url = "https://www.krasarchitects.com/";
  const titleMeta = locale === "en" ? blog.title : blog.germanTitle;
  const descriptionMeta =
    locale === "en" ? blog.description : blog.germanDescription;
  const imageMeta = blog.thumbnail;

  return {
    title: titleMeta,
    description: descriptionMeta,
    openGraph: {
      title: titleMeta,
      description: descriptionMeta,
      url: `${url}/${locale}/blog/${encodeURIComponent(title)}`,
      images: [
        {
          url: imageMeta,
          width: 1200,
          height: 630,
          alt: titleMeta,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleMeta,
      description: descriptionMeta,
      images: [imageMeta],
    },
    alternates: {
      canonical: `${url}/${locale}/blog/${encodeURIComponent(title)}`,
      languages: {
        en: `${url}/en/blog/${title}`,
        de: `${url}/de/blog/${title}`,
      },
    },
  };
}

async function BlogsServerSideTitle({params}: props) {
  const {locale, title} = await params;
  const blog = await getBlogByTitle(decodeURIComponent(title));
  if (!blog) return notFound();

  const titleMeta = locale === "en" ? blog.title : blog.germanTitle;
  const descriptionMeta =
    locale === "en" ? blog.description : blog.germanDescription;
  const imageMeta = blog.thumbnail;
  const blogUrl = `https://www.krasarchitects.com/${locale}/blog/${encodeURIComponent(
    title
  )}`;
  const publishedDate = blog.date || new Date().toISOString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: titleMeta,
    description: descriptionMeta,
    image: [imageMeta],
    datePublished: publishedDate,
    dateModified: publishedDate,
    url: blogUrl,
    author: {
      "@type": "Organization",
      name: "Kras Architects",
      url: "https://www.krasarchitects.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Kras Architects",
      logo: {
        "@type": "ImageObject",
        url: "https://www.krasarchitects.com/favicon.ico",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogUrl,
    },
  };

  return (
    <main>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
      </Head>

      <div className=" flex flex-col items-center pt-32 ">
        <p className=" mb-8 text-gray-300 " id="page0">
          {blog.date &&
            new Date(blog.date).toDateString().split(" ").splice(1).join(" ")}
        </p>
        <h1 className="text-4xl break-words pb-7 px-7 ">
          {locale === "en" ? blog.title : blog.germanTitle}
        </h1>
        <div className="w-[90%] md:w-[60%] lg:w-[40%] object-contain h- flex items-center justify-center ">
          <Image
            className="w-full h-[800px] rounded-xl object-cover"
            width={500}
            height={300}
            src={blog.thumbnail}
            alt={locale === "en" ? blog.title : blog.germanTitle}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {locale === "en"
          ? blog?.description.children.map((description, i) => (
              <p className=" my-7 text-gray-300 md:w-[70%] px-7" key={i}>
                {description.children[0].text}
              </p>
            ))
          : blog?.germanDescription.children.map((description, i) => (
              <p className=" my-7 text-gray-300 md:w-[70%] px-7" key={i}>
                {description.children[0].text}
              </p>
            ))}
      </div>
    </main>
  );
}

export default BlogsServerSideTitle;
