"use client";

import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/navigation";

export const Hotkeys = () => {
  const router = useRouter();
  useHotkeys(
    "c",
    () => {
      router.push("/notes/new");
    },
    { preventDefault: true },
  );

  return null;
};
