'use client'

import { type ReactNode, createContext, useContext, useRef } from 'react'
import { createStore, useStore } from 'zustand'

type GlobalStateProps = {
  pinned: boolean
}

const createGlobalStore = (initProps: GlobalStateProps) => {
  return createStore<GlobalStateProps>(() => ({
    ...initProps,
  }))
}

type GlobalStore = ReturnType<typeof createGlobalStore>

const GlobalContext = createContext<GlobalStore | null>(null)

export const useGlobalStore = <T extends GlobalStateProps>(
  selector: (state: GlobalStateProps) => T,
) => {
  const store = useContext(GlobalContext)
  if (!store) throw new Error('Missing GlobalProvider in the tree')
  return useStore(store, selector)
}

export const GlobalProvider = ({
  children,
  pinned,
}: { children: ReactNode } & GlobalStateProps) => {
  const store = useRef(createGlobalStore({ pinned })).current

  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  )
}
