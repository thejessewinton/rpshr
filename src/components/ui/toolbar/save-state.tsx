import { AnimatePresence, motion } from 'framer-motion'
import { Ping } from '~/components/shared/ping'
import { Spinner } from '~/components/shared/spinner'
import { Tooltip } from '~/components/shared/tooltip'

type SaveStateProps = {
  isPending?: boolean
  isSuccess?: boolean
  isError?: boolean
  noteId?: string
}

export const SaveState = ({
  isPending,
  isSuccess,
  isError,
}: SaveStateProps) => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger className="-ml-2 mr-2">
        <AnimatePresence mode="popLayout">
          <motion.div
            initial={{
              opacity: 0,
              translateY: 10,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            exit={{
              opacity: 0,
              translateY: -10,
            }}
            key={
              isPending
                ? 'pending'
                : isSuccess
                  ? 'success'
                  : isError
                    ? 'error'
                    : 'idle'
            }
            className="flex size-8 items-center justify-center"
          >
            {isPending ? (
              <Spinner />
            ) : isSuccess ? (
              <Ping data-variant="success" />
            ) : isError ? (
              <Ping data-variant="error" />
            ) : (
              <Ping data-variant="idle" />
            )}
          </motion.div>
        </AnimatePresence>
      </Tooltip.Trigger>
      <Tooltip.Content>
        {isPending
          ? 'Pending'
          : isSuccess
            ? 'Saved'
            : isError
              ? 'Error'
              : 'No changes'}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
