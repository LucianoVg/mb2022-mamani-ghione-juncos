/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'mb2022-mamani-ghione-juncos.vercel.app']
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID
  },
  async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: `https://mb2022-mamani-ghione-juncos.vercel.app/api/:path`
      }
    ]
  }
}

module.exports = nextConfig
