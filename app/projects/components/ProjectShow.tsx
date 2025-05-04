"use client";
import React, {useState} from "react";
import {getAllProjects, getProjectByType} from "../../lib/tina/queris";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useInView} from "react-intersection-observer";
import {Button} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import dynamic from "next/dynamic";
const ProjectCard = dynamic(() => import("./ProjectCard"), {
  ssr: true,
});

function ProjectShow({initialData, limit, type = null}) {
  const [loadMore, setLoadMore] = useState(true);
  const {ref, inView} = useInView();

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} =
    useInfiniteQuery({
      queryKey: ["projects"],
      queryFn: ({pageParam = {first: limit, after: ""}}) => {
        if (type) {
          return getProjectByType({type, ...pageParam});
        } else {
          return getAllProjects(pageParam);
        }
      },
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

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
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

export default ProjectShow;
