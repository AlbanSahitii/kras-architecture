import React, {useEffect, useRef} from "react";
import Logo from "../../public/logo-white.png";
import {gsap} from "gsap";
import {motion} from "framer-motion";

export default function LogoAnimation() {
  const triangleLeft = useRef<SVGPolygonElement>(null);
  const triangleRight = useRef<SVGPolygonElement>(null);
  const triangleBottom = useRef<SVGPolygonElement>(null);
  const logoWrapper = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!logoWrapper.current) return;

    const img = logoWrapper.current.querySelector("img");
    if (!img) return;

    gsap.set(triangleRight.current, {x: 300, opacity: 0});
    gsap.set(triangleBottom.current, {y: 300, opacity: 0});
    gsap.set(img, {scale: 0.5, opacity: 0});
    gsap.set(svgRef.current, {opacity: 1});

    const tl = gsap.timeline({delay: 0.5});

    tl.to(triangleRight.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        triangleBottom.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "<"
      )
      .to(svgRef.current, {
        opacity: 0,
        duration: 0,
      })
      .to(img, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
  }, []);

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <div className="flex justify-center items-center w-full h-full absolute top-0 left-0 z-10">
        <svg
          ref={svgRef}
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMid meet"
          className="w-full max-w-[500px] h-full max-h-[500px] flex-shrink-0"
        >
          <polygon
            ref={triangleLeft}
            points="200,200 250,250 200,300"
            fill="white"
          />
          <polygon
            ref={triangleRight}
            points="300,200 250,250 300,300"
            fill="white"
            className="opacity-0 translate-x-[300px]"
          />
          <polygon
            ref={triangleBottom}
            points="200,300 250,250 300,300"
            fill="white"
            className="opacity-0 translate-y-[300px]"
          />
        </svg>
      </div>

      <div
        ref={logoWrapper}
        className="absolute top-1/2 left-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <motion.img
          src={Logo.src}
          alt="Logo"
          className="w-full h-full object-contain opacity-0 scale-50"
        />
      </div>
    </div>
  );
}
