import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Testbuild zonder de dev-server (.next) te verstoren: NEXT_DIST_DIR=.build-check npm run build
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
}

export default nextConfig
