/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: { locales: ["ja", "ko", "en"], defaultLocale: "ja" },
  swcMinify: false,
};

module.exports = nextConfig;
