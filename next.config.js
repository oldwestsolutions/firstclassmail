/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    serverComponentsExternalPackages: ['sqlite3', 'bcryptjs']
  },
  output: 'standalone',
  // Optimize for Vercel deployment
  swcMinify: true,
  compress: true,
  poweredByHeader: false
}

module.exports = nextConfig
