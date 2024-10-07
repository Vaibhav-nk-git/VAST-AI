/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https', // Optional, defaults to 'https'
          hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        },
      ],
    },
  };
  
  export default nextConfig;