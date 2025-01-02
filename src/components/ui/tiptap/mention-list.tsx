import type { RouterOutputs } from '~/trpc/react'

export const MentionList = ({
  items,
}: {
  items: RouterOutputs['notes']['getAll']
}) => {
  console.log(items)

  return (
    <div className="dropdown-menu">
      <div className="item">No result</div>
    </div>
  )
}
