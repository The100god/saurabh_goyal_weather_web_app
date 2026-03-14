/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.openweathermap\.org/,
      handler: "NetworkFirst",
      options: {
        cacheName: "weather-api-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 300,
        },
      },
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
  // output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
