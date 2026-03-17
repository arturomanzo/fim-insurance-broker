import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Aggiungi qui eventuali domini esterni per immagini remote
    // remotePatterns: [],
  },
}

export default nextConfig
