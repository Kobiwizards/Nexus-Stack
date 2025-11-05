/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true, // Required for static export
  },
  trailingSlash: true,
  output: 'export', // Enable static exports
}

module.exports = nextConfig