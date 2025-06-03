"use client";
import {getBlogs} from "@/app/lib/tina/queris";
import {useInfiniteQuery} from "@tanstack/react-query";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import {useInView} from "react-intersection-observer";
import LastBlogShow from "./LastBlogShow";
import BlogListShow from "./BlogListShow";
import {useParams} from "next/navigation";

function BlogShowClient({blogs, limit}) {
  const params = useParams();
  const [loadMore, setLoadMore] = useState(true);
  const {ref, inView} = useInView();

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useInfiniteQuery({
      queryKey: ["blogs"],
      queryFn: ({pageParam = {first: limit, after: ""}}) => {
        return getBlogs(pageParam);
      },
      initialPageParam: {first: limit, after: ""},
      initialData: {
        pageParams: [{first: limit, after: ""}],
        pages: [blogs],
      },
      getNextPageParam: lastPage =>
        lastPage.hasNextPage
          ? {first: limit, after: lastPage.endCursor}
          : undefined,
    });

  const flattedData = data?.pages.flatMap(page => page.blogData);

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, loadMore]);

  if (!flattedData) {
    return <p>No Blog Found</p>;
  }
  return (
    <div className="w-screen h-auto px-8">
      <section className="pt-32 snap-start">
        <LastBlogShow blog={flattedData[0]} />
      </section>

      <h2 className="text-xl mt-16 md:mt-32 md:place-self-center  snap-start">
        {params!.locale === "en"
          ? "Recent Publication"
          : "Aktuelle Veröffentlichung"}
      </h2>
      <section className="w-full md:px-32 flex flex-col items-center">
        {flattedData?.slice(1).map((d, i) => (
          <React.Fragment key={d.id || i}>
            <div className="w-full flex justify-center" key={i}>
              <BlogListShow blog={d} />
            </div>
            {i !== flattedData.length - 2 ? (
              <hr className="w-[70%]  hidden md:block " />
            ) : (
              ""
            )}
          </React.Fragment>
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
    </div>
  );
}

export default BlogShowClient;
