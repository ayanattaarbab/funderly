/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'getsafepay.pk',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
