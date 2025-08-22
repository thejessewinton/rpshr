import './src/env.ts';

import type { NextConfig } from 'next';

const config = {
  experimental: {
    useCache: true,
  },
} satisfies NextConfig;

export default config;
