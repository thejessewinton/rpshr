"use client";

import { useWritingStore } from "~/state/use-writing-store";
import { cn } from "~/utils/core";

export const FocusMode = () => {
  const { isFocusMode } = useWritingStore();

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 transition-all",
        "before:absolute before:inset-x-0 before:top-0 before:h-[250px] before:w-full before:bg-black",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-[250px] after:w-full after:bg-black",
        { "opacity-0": !isFocusMode, "opacity-50": isFocusMode },
      )}
    />
  );
};
