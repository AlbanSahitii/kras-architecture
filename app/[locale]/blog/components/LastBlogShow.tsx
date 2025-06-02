"use client";
import {useParams} from "next/navigation";
import React from "react";
import {motion} from "framer-motion";
import Link from "next/link";

function LastBlogShow({blog}) {
  const params = useParams();
  return (
    <>
      <div className=" flex flex-col items-center snap-start">
        <Link href={`/${params!.locale}/blog/${blog.title}`}>
          <h1 id="page0" className="text-4xl break-words">
            {params!.locale === "en" ? blog.title : blog.germanTitle}
          </h1>
        </Link>
        <p className="line-clamp-2 break-words  my-7 text-gray-300 md:w-[80%]">
          {params!.locale === "en"
            ? blog.description.children[0].children[0].text
            : blog.germanDescription.children[0].children[0].text}
        </p>
        <div className="w-[90%] md:w-[60%] lg:w-[40%] object-contain h- flex items-center justify-center">
          <Link href={`/${params!.locale}/blog/${blog.title}`}>
            <motion.img
              className="w-full h-[800px]  rounded-xl "
              src={blog.thumbnail}
              alt={params!.locale === "en" ? blog.title : blog.germanTitle}
            />
          </Link>
        </div>
        <p className="self-center my-4 text-gray-300 snap-start">
          {new Date(blog.date).toDateString().split(" ").splice(1).join(" ")}
        </p>
      </div>
    </>
  );
}

export default LastBlogShow;
