import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The floating "N" badge would sit over the invitation in local previews.
  devIndicators: false,
  images: {
    // Next's default of 75 visibly smears skin and hair at hero size.
    qualities: [90],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
