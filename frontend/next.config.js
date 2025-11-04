/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  output: 'standalone',
  trailingSlash: true,
}

module.exports = nextConfig