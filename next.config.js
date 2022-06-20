/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co']
  },
  experimental: {
    newNextLinkBehavior: true
  }
}

module.exports = nextConfig
