export const Marble = ({ children, size = 15 }: { children: string; size?: number }) => {
  const colors = [
    '#334155',
    '#b91c1c',
    '#c2410c',
    '#65a30d',
    '#166534',
    '#14b8a6',
    '#7e22ce',
    '#881337',
    '#0ea5e9',
    '#083344',
    '#134e4a',
    '#fef08a',
    '#fca5a5',
    '#a5f3fc',
    '#f472b6'
  ]

  const getColor = (string: string) => {
    const hash = string.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc)
    }, 0)

    return Math.abs(hash)
  }

  const colorIndex = getColor(children) % colors.length

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns='http://www.w3.org/2000/svg'
      aria-label={children}
      className='rounded-full'
    >
      <circle cx={size / 2} cy={size / 2} r='45' fill={colors[colorIndex]} />
      <title>{children} avatar</title>
    </svg>
  )
}
