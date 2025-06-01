import React, {useEffect, useRef} from "react";
import {gsap} from "gsap";

export default function LogoAnimation() {
  const triangleLeft = useRef<SVGPolygonElement>(null);
  const triangleRight = useRef<SVGPolygonElement>(null);
  const triangleBottom = useRef<SVGPolygonElement>(null);
  const titleWrapper = useRef<HTMLDivElement>(null);
  const secondTitleWrapper = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!titleWrapper.current || !secondTitleWrapper.current) return;

    gsap.set(triangleRight.current, {x: 300, opacity: 0});
    gsap.set(triangleBottom.current, {y: 300, opacity: 0});
    gsap.set(titleWrapper.current, {opacity: 0});
    gsap.set(secondTitleWrapper.current, {opacity: 0});
    gsap.set(svgRef.current, {opacity: 1});

    const tl = gsap.timeline({delay: 0.5});

    tl.to(triangleRight.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
    })
      .to(
        triangleBottom.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        "<"
      )
      .to([titleWrapper.current, secondTitleWrapper.current], {
        x: 0,
        opacity: 1,
        duration: 1,
      });
  }, []);

  return (
    <div className=" w-full h-screen flex justify-center items-center snap-start">
      <div className="w-full absolute inset-0 bg-[url('/background-logo-black.jpg')] bg-cover opacity-[0.04] z-10   md:block"></div>

      <div className="relative  max-w-[500px] top-0 left-[0px] z-20">
        <div className="" id="page1">
          <svg
            ref={svgRef}
            viewBox="0 0 500 500"
            preserveAspectRatio="xMidYMid meet"
            className="w-full max-w-[500px] h-full max-h-[500px] flex-shrink-0"
          >
            <polygon
              ref={triangleLeft}
              points="200,200 247,250 200,298"
              fill="white"
            />
            <polygon
              ref={triangleRight}
              points="300,200 252,250 300,297"
              fill="white"
              className="opacity-0 translate-x-[300px]"
            />
            <polygon
              ref={triangleBottom}
              points="203,300 250,253 297,300"
              fill="white"
              className="opacity-0 translate-y-[300px]"
            />
          </svg>
        </div>
        <p
          ref={titleWrapper}
          className="absolute top-48 left-[85px] opacity-0 text-5xl tracking-widest "
        >
          KRAS
        </p>
        <p
          ref={secondTitleWrapper}
          className="absolute top-60 left-[87px] opacity-0 text-xs "
        >
          Architecture & Design
        </p>
      </div>
    </div>
  );
}
