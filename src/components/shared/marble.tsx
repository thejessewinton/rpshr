export const Marble = ({
  children,
  size = 15,
}: { children: string; size?: number }) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={children}
      className="rounded-full"
    >
      <circle cx={size / 2} cy={size / 2} r="45" className="fill-green-800" />
      <title>avatar fallback</title>
    </svg>
  )
}
