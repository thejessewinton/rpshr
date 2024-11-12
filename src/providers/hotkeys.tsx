"use client";

import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/navigation";

export const Hotkeys = () => {
  const router = useRouter();

  useHotkeys("c", () => {
    router.push("/new");
  });

  return null;
};
