import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // TODO: change to own url
    domains: [
      'images.unsplash.com',
      'tailwindui.com',
      'uemmiawppgwbauaczpwh.supabase.co',
    ], // Add your external image domains here
  },
};

export default nextConfig;
