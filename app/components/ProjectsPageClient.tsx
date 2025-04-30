"use client";
import React, {useEffect, useRef, useState} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getAllProjects} from "../lib/tina/queris";
import {useInView} from "react-intersection-observer";
function ProjectsPageClient({initialData, limit}) {
  console.log(initialData);
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useInfiniteQuery({
      queryKey: ["projects"],
      queryFn: ({pageParam = {first: limit, after: ""}}) =>
        getAllProjects(pageParam),

      initialPageParam: {first: limit, after: ""},

      initialData: {
        pageParams: [{first: limit, after: ""}],
        pages: [initialData],
      },

      getNextPageParam: lastPage =>
        lastPage.hasNextPage
          ? {first: limit, after: lastPage.endCursor}
          : undefined,
    });

  const {ref, inView} = useInView();
  const flattedData = data?.pages.flatMap(page => page.projects);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <>
      <div>
        {flattedData?.map((project, index) => (
          <img
            key={index}
            src={project?.thumbnail}
            className="w-screen h-screen"
          ></img>
        ))}
      </div>
      <div ref={ref}>{isFetchingNextPage ? "Loading" : ""}</div>
    </>
  );
}

export default ProjectsPageClient;
