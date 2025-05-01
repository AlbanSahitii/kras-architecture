"use client";
import React, {useState} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getAllProjects} from "../lib/tina/queris";
import {useInView} from "react-intersection-observer";
import {Button} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import dynamic from "next/dynamic";
import Link from "next/link";
import ProjectTypes from "./ProjectTypes";

const ProjectCard = dynamic(() => import("./ProjectCard"), {
  ssr: true,
});

function ProjectsPageClient({initialData, limit}) {
  const [loadMore, setLoadMore] = useState(true);
  const {ref, inView} = useInView();

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

  const flattedData = data?.pages.flatMap(page => page.projects);

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, loadMore]);

  return (
    <>
      <ProjectTypes />
      <section className="flex justify-evenly flex-wrap">
        {flattedData?.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </section>

      {hasNextPage && (
        <div className="flex justify-center pt-14" ref={ref}>
          {isFetchingNextPage ? (
            <Spinner size="md" className="bg-white" />
          ) : (
            <Button
              variant="outline"
              onClick={() => setLoadMore(prev => !prev)}
            >
              Load More
            </Button>
          )}
        </div>
      )}
    </>
  );
}

export default ProjectsPageClient;
