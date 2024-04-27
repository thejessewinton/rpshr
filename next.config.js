import createMDX from '@next/mdx'

await import('./src/env.js')

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [{ hostname: 'lh3.googleusercontent.com', protocol: 'https' }]
  },
  pageExtensions: ['md', 'mdx', 'tsx', 'ts']
}

export default createMDX()(config)
