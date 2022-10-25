/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  // experimental: {
  //   forceSwcTransforms: true,
  // },
};

module.exports = nextConfig;
