// export const generateMetadata = async ({
//   params,
// }: PageProps<'/[id]'>): Promise<Metadata> => {
//   const note = await api.notes.getById({ id: (await params).id })

//   return {
//     title: note?.title ?? 'untitled',
//   }
// }

export default async function Note() {
  return <>Note page</>
}
