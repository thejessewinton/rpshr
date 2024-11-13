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
        'fade-in': 'fade 250ms ease forwards',
        'fade-out': 'fade 250ms ease reverse',
        'scale-in': 'scale 250ms ease forwards',
        'scale-out': 'scale 250ms ease reverse',
        'slide-in': 'slide 250ms ease forwards',
        'slide-out': 'slide 250ms ease reverse',
        tooltip: 'fade 250ms ease forwards, slide 250ms ease forwards',
        menu: 'fade-in 250ms ease forwards, slide-in 250ms ease forwards'
      },
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scale: {
          '0%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' }
        },
        slide: {
          '0%': { transform: 'translateY(10px)' },
          '100%': { transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: [radix, typography]
} satisfies Config
