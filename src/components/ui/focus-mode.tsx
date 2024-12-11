'use client'

import { useFocusStore } from '~/state/use-focus-store'

export const FocusMode = () => {
  const { isFocusMode } = useFocusStore()

  if (!isFocusMode) return null

  return (
    <div className="pointer-events-none fixed inset-0 bg-black/10">
      Focus mode
    </div>
  )
}

/* &::before {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 10;
    backdrop-filter: blur(var(--blur));
    mask-composite: intersect;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 1),
      transparent 2%,
      transparent 98%,
      rgba(0, 0, 0, 1)
    );
  } */
