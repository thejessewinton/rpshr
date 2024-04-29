export const Marble = ({ children, size = 15 }: { children: string; size?: number }) => {
  const getColor = (string: string) => {
    const hslColor = 'hsl(201, 96%, 32%)'
    const hslMatch = hslColor.match(/(\d+\.?\d*),\s*(\d+\.?\d*%),\s*(\d+\.?\d*%)/)

    if (!hslMatch) {
      console.error('Invalid HSL color format.')
      return hslColor
    }

    const [, h, s, l] = hslMatch.map(parseFloat)
    const lengthFactor = Math.min(string.length) / 10

    const adjustedL = l! + (lengthFactor * 50 - l!)

    return `hsl(${h}, ${s}%, ${adjustedL}%)`
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns='http://www.w3.org/2000/svg'
      aria-label={children}
      className='rounded-full'
    >
      <circle cx={size / 2} cy={size / 2} r='45' fill={getColor(children.replace(' ', ''))} />
      <title>avatar fallback</title>
    </svg>
  )
}
