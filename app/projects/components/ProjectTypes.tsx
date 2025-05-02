import Link from "next/link";
import React from "react";

function ProjectTypes() {
  return (
    <>
      <section>
        <h1 className="text-4xl pt-40 mx-10 mb-9">Projects</h1>
      </section>
      <div className="w-full pb-10">
        <section className="flex justify-between mx-10 md:flex md:justify-start">
          <Link href="/projects">
            <p className="text-sm md:text-xl md:mx-5">All</p>
          </Link>
          <Link href="/projects/Comercial">
            <p className="text-sm md:text-xl md:mx-5">Comercial</p>
          </Link>
          <Link href="/projects/Residental">
            <p className="text-sm md:text-xl md:mx-5">Residental</p>
          </Link>
          <Link href="/projects/Competition">
            <p className="text-sm md:text-xl md:mx-5">Competition</p>
          </Link>
        </section>
      </div>
    </>
  );
}

export default ProjectTypes;
