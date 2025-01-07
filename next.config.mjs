/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["files.edgestore.dev"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "example.com",
    //     port: "",
    //     pathname: "/**",
    //   },
    //   // Ajoutez d'autres patterns si nécessaire
    // ],
  },
};

export default nextConfig;
