"use client";

import { Logo } from "~/components/shared/logo";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="relative z-50 mx-auto flex w-full max-w-3xl justify-between py-10">
      <Link href="/">
        <Logo />
      </Link>
    </header>
  );
};
