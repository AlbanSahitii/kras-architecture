"use client";

import React, {useEffect, useState} from "react";
import {ArrowLeft, Ghost} from "lucide-react";
import {motion} from "framer-motion";
import Link from "next/link";
import {useParams} from "next/navigation";

const NotFound = () => {
  const params = useParams();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <>
      <main className="flex justify-center items-center h-screen">
        <div
          id="page1"
          className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center"
        >
          <motion.div
            initial={{scale: 0.8, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            transition={{duration: 0.4, ease: "easeOut"}}
            className="flex flex-col items-center gap-4"
          >
            <Ghost className="w-20 h-20 text-white/20" strokeWidth={1} />
            <h1 className="text-4xl font-bold tracking-tight">
              {params!.locale === "en"
                ? "Page Not Found"
                : "Seite nicht gefunden"}
            </h1>
            <p className="text-white/60 text-lg max-w-md">
              {params!.locale === "en"
                ? "Sorry, we couldn't find the page you were looking for."
                : "Leider konnten wir die gesuchte Seite nicht finden."}
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {params!.locale === "en" ? "Back to home" : "Zurück nach Hause"}
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
