/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'crossOrigin',
            value: '*'
          }
        ]
      }
    ]
  },
  images: {
    domains: ['firebasestorage.googleapis.com']
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID
  }
}
module.exports = nextConfig

