# Shadcn Registry 部署指南

本指南将指导您如何将项目部署到 GitHub Pages。

## 已完成的配置

### 1. Next.js 配置更新

在 `next.config.ts` 中添加了 GitHub Pages 支持：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 配置 GitHub Pages 子路径
  basePath: "/shadcn-registry",
  // 启用静态导出
  output: "export",
  // 配置图片和资源的路径
  images: {
    unoptimized: true,
  },
  // 配置 assetPrefix
  assetPrefix: "/shadcn-registry/",
};

export default nextConfig;
```

### 2. GitHub Actions 自动化部署

创建了 `.github/workflows/deploy.yml` 文件，用于自动部署：

- 当推送到 `main` 分支时触发
- 构建 Next.js 项目
- 将构建产物部署到 GitHub Pages

### 3. package.json 更新

添加了 `deploy` 脚本用于手动部署：

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build -o docs",
  "deploy": "next build && touch out/.nojekyll"
}
```

## 部署步骤

### 1. 配置 GitHub 仓库

1. 确保您有一个 GitHub 仓库 `shadcn-registry`
2. 在仓库设置中启用 GitHub Pages：
   - 转到 **Settings > Pages**
   - 源选择 **GitHub Actions**

### 2. 自动部署（推荐）

1. 将代码推送到 `main` 分支：
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push origin main
   ```

2. GitHub Actions 将自动：
   - 构建项目
   - 部署到 `https://erishen.github.io/shadcn-registry/`

### 3. 手动部署

1. 构建项目：
   ```bash
   npm run deploy
   ```

2. 将构建产物推送到 `gh-pages` 分支：
   ```bash
   npx gh-pages -d out
   ```

## 注意事项

1. 确保 `basePath` 和 `assetPrefix` 与您的 GitHub Pages 子路径一致
2. `.nojekyll` 文件确保 GitHub Pages 不会将 `_next` 目录视为 Jekyll 特殊目录
3. 图片必须使用 `unoptimized: true` 配置，因为 GitHub Pages 不支持 Next.js 图片优化

## 验证部署

部署完成后，您可以访问：
`https://erishen.github.io/shadcn-registry/`

## 常见问题

### 1. 资源路径错误

确保所有资源路径都正确配置了 `basePath`，例如：
- 图片路径：`/shadcn-registry/image.jpg`
- 链接：`/shadcn-registry/about`

### 2. 404 错误

检查：
- GitHub Pages 源是否设置正确
- 构建产物是否包含所有必要的页面
- `.nojekyll` 文件是否存在

### 3. 构建失败

如果构建失败，请检查：
- ESLint 错误
- 类型错误
- 导入路径是否正确
