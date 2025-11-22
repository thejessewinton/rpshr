import './src/env.ts'

import type { NextConfig } from 'next'

const config = {
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    useCache: true,
    turbopackFileSystemCacheForDev: true,
  },
} satisfies NextConfig

export default config
