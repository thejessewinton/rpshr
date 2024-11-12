import { FocusMode } from "~/components/ui/focus-mode";

type NotePageParams = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Note({ params }: NotePageParams) {
  return <div>Note Page: {(await params).id}</div>;
}
