/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers: {
    basePath: process.env.NEXT_PUBLIC_CLIENT_URL,
    crossOrigin: '*'
  },
  images: {
    domains: ['firebasestorage.googleapis.com']
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    BASE_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID
  }
}

module.exports = nextConfig
