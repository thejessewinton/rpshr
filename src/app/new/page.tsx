import { Metadata } from "next";
import { Editor } from "~/components/tiptap/editor";

export const metadata: Metadata = {
  title: "New Note",
};

export default async function NewNote() {
  return <Editor />;
}
