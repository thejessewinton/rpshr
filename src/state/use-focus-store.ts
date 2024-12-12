import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FocusStoreState = {
  isFocusMode: boolean
  toggleIsFocusMode: () => void
}

export const useFocusStore = create(
  persist<FocusStoreState>(
    (set, get) => ({
      isFocusMode: false,
      toggleIsFocusMode: () => set({ isFocusMode: !get().isFocusMode }),
    }),
    {
      name: 'user:focus',
    },
  ),
)
