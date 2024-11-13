import typography from '@tailwindcss/typography'
import { type Config } from 'tailwindcss'
import radix from 'tailwindcss-radix'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono]
      },
      animation: {
        fade: 'animate-opacity 250ms ease forwards',
        menu: 'animate-opacity 250ms ease forwards, animate-up 250ms ease forwards',
        enter:
          'animate-scale 0.75s ease-in-out both, animate-blur 0.75s ease-in-out both, animate-opacity 0.75s ease-in-out both'
      },
      keyframes: {
        'animate-opacity': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        },
        'animate-blur': {
          '0%': {
            filter: 'blur(2px)'
          },
          '100%': {
            filter: 'blur(0px)'
          }
        },
        'animate-up': {
          '0%': {
            transform: `translateY(8px)`
          },
          '100%': {
            transform: 'translateY(0px)'
          }
        },
        'animate-scale': {
          '0%': {
            transform: `translateY(10px)`
          },
          '100%': {
            transform: 'translateY(0px)'
          }
        }
      }
    }
  },
  plugins: [radix, typography]
} satisfies Config
