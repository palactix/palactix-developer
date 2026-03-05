import nextra from 'nextra'
 
// Set up Nextra with its configuration
const withNextra = nextra({
  contentDirBasePath: '/docs', // Maps content directory to /docs
})
 
// Export the final Next.js config with Nextra included
export default withNextra({
  // ... Add regular Next.js options here
  reactStrictMode: true,
  images: {
    dangerouslyAllowLocalIP: true,
     remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.palactix.com",
        pathname: "/**",
      },
    ],
  },
})