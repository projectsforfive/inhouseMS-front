/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  typescript: {
    ignoreBuildErrors: true,
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
