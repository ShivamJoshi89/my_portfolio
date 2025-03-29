/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/my_portfolio', 
  assetPrefix: '/my_portfolio/', 
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig;
