"use client";

import { useWritingStore } from "~/state/use-writing-store";
import { Signature } from "@phosphor-icons/react/dist/ssr";
import { cn } from "~/utils/core";
import { Logo } from "../shared/logo";

export const Header = () => {
  return (
    <header className="relative z-50 mx-auto flex w-full max-w-3xl justify-between py-10">
      <Logo />
      <FocusSwitcher />
    </header>
  );
};

const FocusSwitcher = () => {
  const { isFocusMode, toggleIsFocusMode } = useWritingStore();

  return (
    <button onClick={toggleIsFocusMode}>
      <Signature
        className={cn("size-6 transition-colors", {
          "text-white": isFocusMode,
          "text-neutral-600": !isFocusMode,
        })}
      />
    </button>
  );
};
