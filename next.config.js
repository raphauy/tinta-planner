/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {    
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5700",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "planner.tinta.wine",
        port: "",
      },
      {
        protocol: "https",
        hostname: "preview.tinta.wine",
        port: "",
      },
      {
        protocol: "https",
        hostname: "whatsapp.tinta.wine",
        port: "",
      },
      {
        protocol: "https",
        hostname: "whatsapp.raphauy.dev",
        port: "",
      },
      {
        protocol: "https",
        hostname: "pps.whatsapp.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },    
}

module.exports = nextConfig
