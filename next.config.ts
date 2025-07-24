import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === "production"
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'i.pinimg.com'
      }
    ]
  },
  
  experimental:{
    serverActions:{
      allowedOrigins: ['*.cheatdev.online']
    }
  }

  // ,
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: '**'
  //     },
   
  //   ]
  // }
};

export default nextConfig;