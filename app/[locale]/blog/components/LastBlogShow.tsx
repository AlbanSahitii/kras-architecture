"use client";
import {useParams} from "next/navigation";
import React from "react";
import {motion} from "framer-motion";

function LastBlogShow({blog}) {
  const params = useParams();

  console.log(blog);
  return (
    <>
      <div className=" flex flex-col items-center">
        <h1 id="page0" className="text-4xl break-words">
          {params!.locale === "en" ? blog.title : blog.germanTitle}
        </h1>
        <p className="line-clamp-4 break-words  my-7 text-gray-300">
          {params!.locale === "en" ? blog.description : blog.germanDescription}
        </p>
        <div className="w-[90%] md:w-[60%] lg:w-[40%] object-contain h- flex items-center justify-center">
          <motion.img
            className="w-full h-auto  rounded-xl "
            src={blog.thumbnail}
            alt={params!.locale === "en" ? blog.title : blog.germanTitle}
          />
        </div>
        <p className="self-center my-4 text-gray-300">
          {new Date(blog.date).toDateString().split(" ").splice(1).join(" ")}
        </p>
      </div>
    </>
  );
}

export default LastBlogShow;
