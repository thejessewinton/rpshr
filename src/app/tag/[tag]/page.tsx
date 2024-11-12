type TagPageParams = {
  params: Promise<{
    tag: string
  }>
}

export default async function Tag({ params }: TagPageParams) {
  return <div>Tag Page</div>
}
