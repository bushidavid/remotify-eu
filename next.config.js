/** @type {import('next').NextConfig} */


const nextConfig = {
    images: {
      domains: ['rzghwrcqyzeuluqxwale.supabase.co','lh3.googleusercontent.com']
    },
    webpack: (config) => {
       config.resolve.alias.canvas = false;
      
       return config;
    },
    swcMinify: false,
  }
   
  module.exports = nextConfig