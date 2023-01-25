/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true }, // Next.js v13 app directory 사용 여부
  output: 'standalone',
};

export default nextConfig;
