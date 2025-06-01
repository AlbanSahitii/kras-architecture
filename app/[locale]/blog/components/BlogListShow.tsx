import {useParams} from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";
function BlogListShow({blog}) {
  const params = useParams();
  return (
    <>
      <div className="md:w-[80%] text-gray-300  flex  justify-between my-10 md:my-14 snap-start">
        <div className="flex flex-col">
          <span>
            <p className="inline ">
              {new Date(blog.date)
                .toDateString()
                .split(" ")
                .splice(1)
                .join(" ")}
            </p>
            <p className="inline px-3">•</p>
            <p className="inline">{`#${
              params!.locale === "en" ? blog.type : blog.germanType
            }`}</p>
          </span>
          <Link href={`/${params!.locale}/blog/${blog.title}`}>
            <p className="break-words mt-3 text-xl">
              {params!.locale === "en" ? blog.title : blog.germanTitle}
            </p>
          </Link>
        </div>
        <div className="hidden md:block h-80 ">
          <Link href={`/${params!.locale}/blog/${blog.title}`}>
            <Image
              className="rounded-xl h-80 "
              alt="blog image"
              src={blog.thumbnail}
              width={300}
              height={200}
              sizes="(max-height: 200px) 100vw, 50vw"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default BlogListShow;
