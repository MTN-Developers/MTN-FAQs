/** @type {import('next').NextConfig} */
import withVideos from "next-videos";

const nextConfig = withVideos({
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
});

// const nextConfig = {
//   output: "standalone",

//   images: {
//     remotePatterns: [
//       {
//         hostname: "res.cloudinary.com",
//       },
//     ],
//   },
// };

export default nextConfig;
