import { type SVGProps } from 'react'

export const Logo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='none' viewBox='0 0 30 30' {...props}>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.25'
        d='M19.152 2a40.52 40.52 0 01-4.88 13.53A40.5 40.5 0 015 26.523M22.904 6.355a35.094 35.094 0 01-4.227 11.72 35.08 35.08 0 01-8.031 9.522'
      />
    </svg>
  )
}
