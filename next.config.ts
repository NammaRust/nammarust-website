/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tells Next.js to build a static HTML/CSS/JS site
  output: "export",
  
  // Disables server-side image optimization for GitHub Pages compatibility
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;