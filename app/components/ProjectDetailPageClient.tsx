"use client";
import Link from "next/link";
import {notFound} from "next/navigation";
import {useEffect} from "react";

function ProjectDetailPageClient({project}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className=" px-3 pt-40 md:px-5">
        <section>
          <h1 className="tracking-wide">{project.type}</h1>
          <h1 className="text-2xl md:text-8xl tracking-wider">
            {project.title}
          </h1>
        </section>
        <section className="mt-5 flex justify-center flex-col md:flex-row md:justify-between md:px-20">
          <div className="flex justify-between  md:flex-none md:pt-32">
            <div className="mr-10">
              <p>Date</p>
              <p>{project.date}</p>
            </div>
            <div>
              <p>Location</p>
              <p>{project.city}</p>
            </div>
          </div>
          <div className="md:ml-10">
            <img
              className="w-auto mt-10 rounded-lg"
              src={project.thumbnail}
            ></img>
          </div>
        </section>
      </div>

      <div className="p-5 md:mx-60">
        <h1 className="text-xl mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur{" "}
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis culpa
          maxime ut earum quaerat officiis sequi eos dolor, explicabo facilis
          dicta harum ex natus, maiores eligendi obcaecati atque quam quis?
        </p>
      </div>
      <br />
      <div className="p-5 md:mx-20">
        <section>
          <h1 className="text-2xl mb-5">Project Images</h1>
        </section>
        <section className="flex  items-center flex-col md:flex-row md:flex-wrap ">
          {project.images.map((img, index) => (
            <img
              key={index}
              className=" border border-red-500 w-80 h-auto md:w-80 md:h-80 m-2 "
              src={img.path}
            />
          ))}
        </section>
      </div>
      <hr className="my-10 w-10/12 place-self-center" />
      <div className="">
        <section>
          <h1>Other Project</h1> <img src={project?.images[0].path}></img>
        </section>
        <section>
          <p></p>
          <Link href="">
            <h1>NEXT PROJECT Title</h1>
          </Link>

          <Link href="">
            <p>NEXT PROJECT</p>
          </Link>
        </section>
      </div>
    </>
  );
}

export default ProjectDetailPageClient;
