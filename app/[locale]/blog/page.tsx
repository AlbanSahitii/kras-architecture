import React from "react";
import BlogShowClient from "./components/BlogShowClient";
import {getBlogs} from "@/app/lib/tina/queris";
import Footer from "../components/Footer";

export async function generateMetadata() {
  return {
    title: {
      default: "Blog",
      template: `%s | Kras Architects`,
    },
  };
}

async function BlogsServerSide() {
  const limit = 10;
  const blogs = await getBlogs({
    first: limit,
  });

  return (
    <>
      <main>
        <BlogShowClient blogs={blogs} limit={limit} />
      </main>
      <Footer />
    </>
  );
}

export default BlogsServerSide;
