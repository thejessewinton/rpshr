'use client'

import { type ComponentProps } from 'react'

import { Toaster as Sonner } from 'sonner'

import { Ping } from '~/components/shared/ping'

export const Toaster = ({ ...props }: ComponentProps<typeof Sonner>) => {
  return (
    <Sonner
      position='bottom-center'
      className='group'
      toastOptions={{
        classNames: {
          toast:
            'transform-gpu border-neutral-200/70 rounded-full flex items-center justify-center text-neutral-700 rounded border dark:border-neutral-700/30 backdrop-blur-sm bg-transparent dark:text-neutral-400',
          title: 'text-sm font-light'
        }
      }}
      icons={{
        success: <Ping data-variant='success' />,
        warning: <Ping data-variant='warning' />,
        error: <Ping data-variant='error' />
      }}
      {...props}
    />
  )
}
