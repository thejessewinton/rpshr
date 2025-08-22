import { ListDashes } from '@phosphor-icons/react'
import { format } from 'date-fns'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { KBD } from '~/components/shared/kbd'
import { Menu } from '~/components/shared/menu'
import { Tooltip } from '~/components/shared/tooltip'
import { api } from '~/trpc/react'

export const NotesList = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useHotkeys('n', () => {
    setOpen(true)
  })

  const { data } = api.notes.getAll.useQuery()

  return (
    <Tooltip.Root>
      <Menu.Root open={open} onOpenChange={setOpen}>
        <Menu.Trigger className="rounded-full">
          <Tooltip.Trigger
            render={
              <div className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
                <ListDashes className="size-4 text-neutral-900 transition-transform dark:text-white" />
              </div>
            }
          />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup className="group min-w-xs overflow-y-scroll">
              {!data?.length ? (
                <div className="flex h-20 flex-1 flex-col items-center justify-center rounded-md border border-neutral-400/70 border-dashed font-medium text-neutral-400 text-xs dark:border-neutral-700/70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    className="fill-neutral-400/70 dark:fill-neutral-700/70"
                    viewBox="0 0 256 256"
                  >
                    <path d="M92,96a4,4,0,0,1,4-4h64a4,4,0,0,1,0,8H96A4,4,0,0,1,92,96Zm4,36h64a4,4,0,0,0,0-8H96a4,4,0,0,0,0,8Zm32,24H96a4,4,0,0,0,0,8h32a4,4,0,0,0,0-8ZM220,48V156.69a11.9,11.9,0,0,1-3.52,8.48l-51.31,51.32a11.93,11.93,0,0,1-8.48,3.51H48a12,12,0,0,1-12-12V48A12,12,0,0,1,48,36H208A12,12,0,0,1,220,48ZM48,212H156V160a4,4,0,0,1,4-4h52V48a4,4,0,0,0-4-4H48a4,4,0,0,0-4,4V208A4,4,0,0,0,48,212Zm158.35-48H164v42.35Z" />
                  </svg>
                </div>
              ) : (
                <div className="space-y-2">
                  {data.map((note) => {
                    const isCurrent = pathname === `/${note.id}`
                    return (
                      <Menu.Item
                        key={note.id}
                        className="flex w-full items-center justify-between px-3 py-2"
                        render={
                          <Link href={`/${note.id}`}>
                            <div className="flex items-center gap-2">
                              {isCurrent && (
                                <span className="size-1 rounded-full bg-green-400 dark:bg-green-600/50" />
                              )}
                              <span className="line-clamp-1 max-w-[20ch]">
                                {note.title}
                              </span>
                            </div>

                            <span className="font-mono text-neutral-500 text-xs">
                              <KBD>
                                {format(
                                  note.updated_at ?? note.created_at,
                                  'MMM do',
                                )}
                              </KBD>
                            </span>
                          </Link>
                        }
                      />
                    )
                  })}
                </div>
              )}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Tooltip.Content>
        Notes <KBD>N</KBD>
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
