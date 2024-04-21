import { type SVGProps } from 'react'

export const Logo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='21' height='28' fill='none' viewBox='0 0 21 28' {...props}>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.75'
        d='M15.152 1a40.52 40.52 0 01-4.88 13.53A40.5 40.5 0 011 25.523M18.904 5.355a35.095 35.095 0 01-4.227 11.72 35.08 35.08 0 01-8.031 9.522'
      />
    </svg>
  )
}
