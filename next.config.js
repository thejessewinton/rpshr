await import('./src/env.js')

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [{ hostname: 'lh3.googleusercontent.com', protocol: 'https' }]
  }
}

export default config
