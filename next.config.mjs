import nextra from 'nextra'
 
// Set up Nextra with its configuration
const withNextra = nextra({
  contentDirBasePath: '/docs', // Maps content directory to /docs
})
 
// Export the final Next.js config with Nextra included
export default withNextra({
  // ... Add regular Next.js options here
  reactStrictMode: true,
})