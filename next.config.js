/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "googleusercontent.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "cdn.openai.com",
    ],
  },
  experimental: {
    esmExternals: "loose", 
    serverComponentsExternalPackages: ["mongoose"],
    serverActions: true, 
  },
};

module.exports = nextConfig;
