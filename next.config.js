/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      serverActions: true,
    },
    images: {
      domains: ['rzghwrcqyzeuluqxwale.supabase.co']
    }
  }
   
  module.exports = nextConfig