/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'hi', 'ta', 'bn', 'te', 'kn', 'ml', 'mr', 'gu', 'pa'],
    defaultLocale: 'hi',
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'SUVIDHA ONE',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
};

export default nextConfig;
