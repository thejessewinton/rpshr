import { ReactNode } from "react";
import { FocusMode } from "~/components/ui/focus-mode";

type NotesLayoutProps = {
  children: ReactNode;
};

export default function NotesLayout({ children }: NotesLayoutProps) {
  return (
    <>
      <FocusMode />
      <>{children}</>
    </>
  );
}
