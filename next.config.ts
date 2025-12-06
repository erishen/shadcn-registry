import type { NextConfig } from "next";

// 根据环境配置不同的参数
const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // 仅在生产环境配置 GitHub Pages 子路径
  basePath: isProduction ? "/shadcn-registry" : "",
  // 启用静态导出
  output: "export",
  // 配置图片和资源的路径
  images: {
    unoptimized: true,
  },
  // 仅在生产环境配置 assetPrefix
  assetPrefix: isProduction ? "/shadcn-registry/" : "",
};

export default nextConfig;