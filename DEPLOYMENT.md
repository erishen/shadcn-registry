# Shadcn Registry 部署指南

本指南将指导您如何将项目部署到 GitHub Pages。

## 已完成的配置

### 1. Next.js 配置更新

在 `next.config.js` 中添加了 GitHub Pages 支持：

```javascript
const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isProduction ? "/shadcn-registry" : "",
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: isProduction ? "/shadcn-registry/" : "",
};

module.exports = nextConfig;
```

### 2. Storybook 配置

Storybook 配置在 `.storybook/main.ts` 中，构建输出到 `docs/` 目录。

### 3. GitHub Actions 自动化部署

创建了 `.github/workflows/deploy.yml` 文件，用于自动部署：

- 当推送到 `main` 分支时触发
- 使用 Bun 安装依赖和构建
- 构建 Next.js 项目（输出到 `out/`）
- 构建 Storybook（输出到 `docs/`）
- 将 Storybook 复制到 `out/storybook/`
- 将合并后的产物部署到 GitHub Pages

### 4. package.json 更新

```json
"scripts": {
  "dev": "bun next dev",
  "prod": "bun next build",
  "start": "bun next start",
  "lint": "bun next lint",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build -o docs",
  "deploy": "bun next build && touch out/.nojekyll"
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
   git commit -m "Update deployment configuration"
   git push origin main
   ```

2. GitHub Actions 将自动：
   - 使用 Bun 安装依赖
   - 构建 Next.js 项目
   - 构建 Storybook
   - 部署到 `https://erishen.github.io/shadcn-registry/`
   - Storybook 可访问：`https://erishen.github.io/shadcn-registry/storybook/`

### 3. 本地构建和部署

1. 构建项目：
   ```bash
   bun run prod
   bun run build-storybook
   ```

2. 合并输出：
   ```bash
   mkdir -p out/storybook
   cp -r docs/* out/storybook/
   touch out/.nojekyll
   ```

3. 将构建产物推送到 `gh-pages` 分支：
   ```bash
   npx gh-pages -d out
   ```

## 部署结构

```
https://erishen.github.io/shadcn-registry/
├── /                    # Next.js 应用
├── /storybook/          # Storybook 文档
├── /r/                  # 组件注册表 JSON 文件
└── ...
```

## 注意事项

1. 确保 `basePath` 和 `assetPrefix` 与您的 GitHub Pages 子路径一致
2. `.nojekyll` 文件确保 GitHub Pages 不会将 `_next` 目录视为 Jekyll 特殊目录
3. 图片必须使用 `unoptimized: true` 配置，因为 GitHub Pages 不支持 Next.js 图片优化
4. Storybook 输出会自动复制到 `out/storybook/` 目录

## 验证部署

部署完成后，您可以访问：
- 主应用：`https://erishen.github.io/shadcn-registry/`
- Storybook：`https://erishen.github.io/shadcn-registry/storybook/`

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

### 4. Storybook 无法访问

确保：
- `bun run build-storybook` 成功执行
- `docs/` 目录存在且包含构建产物
- workflow 中的合并步骤正确执行

## 使用 Bun

项目现在使用 Bun 作为包管理器和任务运行器：

```bash
# 安装依赖
bun install

# 开发
bun dev

# 构建
bun run prod

# Storybook
bun run storybook
bun run build-storybook
```

Bun 比 npm/pnpm 更快，完全兼容 Node.js 生态。
