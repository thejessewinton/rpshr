import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type WritingStoreState = {
  isFocusMode: boolean
  toggleIsFocusMode: () => void
}

export const useFocusStore = create(
  persist<WritingStoreState>(
    (set, get) => ({
      isFocusMode: false,
      toggleIsFocusMode: () => set({ isFocusMode: !get().isFocusMode }),
    }),
    {
      name: 'user:focus',
    },
  ),
)
