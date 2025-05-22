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

export default function LanguageToggle() {
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
    <div className="w-full flex justify-center">
      <Select onValueChange={handleChange} defaultValue={currentLocale}>
        <SelectTrigger className="w-36 md:w-[90px] border-none px-4 py-2  text-black md:text-white rounded-md">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent className="bg-white text-black md:bg-inherit md:text-white border-none">
          <SelectGroup>
            <SelectItem value="de">🇩🇪 </SelectItem>
            <SelectItem value="en">🇬🇧 </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
