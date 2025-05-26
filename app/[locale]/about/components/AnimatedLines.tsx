"use client";

import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import SplitType from "split-type";

type AnimatedLinesProps = {
  text: string;
  className?: string;
};

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const lineVariants = {
  hidden: {y: "100%", opacity: 0},
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
};

export const AnimatedLines = ({text, className = ""}: AnimatedLinesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const instance = new SplitType(containerRef.current, {
      types: "lines",
      lineClass: "split-line",
    });

    const extracted = Array.from(
      containerRef.current.querySelectorAll(".split-line")
    ).map(line => line.textContent || "");

    setLines(extracted);

    return () => {
      instance.revert();
    };
  }, [text]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`relative ${className}`}
    >
      {/* Static layout-preserving fallback */}
      <div
        ref={containerRef}
        className="opacity-0 pointer-events-none select-none whitespace-pre-line"
      >
        {text}
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            variants={lineVariants}
            className="block overflow-hidden"
          >
            {line}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
