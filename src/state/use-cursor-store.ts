import { create } from 'zustand'

type CursorState = {
  text: string
  setText: (text: string) => void
}

export const useCursorStore = create<CursorState>((set) => ({
  text: '',
  setText: (text) => set({ text })
}))
