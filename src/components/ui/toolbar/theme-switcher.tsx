import { useTheme } from 'next-themes'
import { useHotkeys } from 'react-hotkeys-hook'
import { KBD } from '~/components/shared/kbd'
import { Tooltip } from '~/components/shared/tooltip'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useHotkeys('/', () => {
    handleToggleTheme()
  })

  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        onClick={handleToggleTheme}
        render={
          <div className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
            <div className="size-2.5 rounded-full bg-neutral-900 dark:bg-white" />
          </div>
        }
      />
      <Tooltip.Content>
        Theme <KBD>/</KBD>
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
