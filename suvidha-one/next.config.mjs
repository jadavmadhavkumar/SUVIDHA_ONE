/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Disable source maps in development to reduce noise
  productionBrowserSourceMaps: false,
  // Configure webpack to exclude source maps in development
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.devtool = false;
    }
    return config;
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'SUVIDHA ONE',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
};

export default nextConfig;
