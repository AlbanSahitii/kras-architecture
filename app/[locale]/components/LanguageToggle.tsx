"use client";

import * as React from "react";
import {useRouter, usePathname, useParams} from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";

export default function LanguageToggle({isWhitePage}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentLocale = params!.locale as "en" | "de";

  const handleChange = (value: string) => {
    if (value === currentLocale) return;
    const newPath = pathname!.replace(`/${currentLocale}`, `/${value}`);
    router.push(newPath);
  };

  return (
    <div className="w-full flex justify-center ">
      <Select onValueChange={handleChange} defaultValue={currentLocale}>
        <SelectTrigger
          className={clsx(
            "w-36 md:w-[130px] border-none px-4 py-2  text-black md:text-white rounded-md",
            isWhitePage ? "md:text-black" : "md:text-white"
          )}
        >
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent
          className={clsx(
            "bg-white text-black  md:bg-inherit  border-none",
            isWhitePage ? "md:text-black" : "md:text-white"
          )}
        >
          <SelectGroup>
            <SelectItem
              value="de"
              className={clsx(
                "text-black  ",
                isWhitePage
                  ? "md:bg-white md:text-black"
                  : "md:bg-black md:text-white"
              )}
            >
              🇩🇪 German
            </SelectItem>
            <SelectItem
              value="en"
              className={clsx(
                "text-black  opacity-80",
                isWhitePage
                  ? "md:bg-white md:text-black"
                  : "md:bg-black md:text-white"
              )}
            >
              🇬🇧 English
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
