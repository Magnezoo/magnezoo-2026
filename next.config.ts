import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    serverActions: {
      bodySizeLimit: "5mb",
    },
    mdxRs: {
      mdxType: "gfm",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "magnezoo.unipro-n.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", ["remark-toc", { heading: "目次" }]],
  },
});

export default withMDX(nextConfig);
