import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Optional: you can set this headers if your/user avatar does not load from google
  async headers(){
    return [
      {
        source:'/:path*',
        headers:[
          {key:'referrer-policy', value:'no-referrer'}
        ]
      }
    ]
  }
};

export default nextConfig;
