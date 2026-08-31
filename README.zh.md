# shadcn-registry

基于 Next.js 和 Storybook 构建的 [shadcn/ui](https://ui.shadcn.com/) 自定义组件注册表（Registry）。本项目支持创建、展示和分发可复用的 React 组件。

**在线演示：** https://erishen.github.io/shadcn-registry

**Storybook：** https://erishen.github.io/shadcn-registry/storybook/

## 特性

- 基于 Next.js 14 与 React 18 构建
- 使用 Storybook 9 编写组件文档
- 面向 shadcn/ui 的自定义组件注册表
- TypeScript 支持
- Tailwind CSS 与 styled-components 样式方案
- 基于 React Hook Form 与 Zod 的表单校验
- Radix UI 组件集成

## 快速开始

### 环境要求

- Bun 1.3+

### 安装

```bash
bun install
```

### 开发

```bash
# 启动开发服务器（http://localhost:3000）
bun dev

# 启动 Storybook（http://localhost:6006）
bun run storybook
```

### 构建

```bash
# 构建 Next.js 项目
bun run prod

# 构建 Storybook 文档
bun run build-storybook

# 部署到 GitHub Pages
bun run deploy
```

## 使用注册表中的组件

在其他项目中，可通过 shadcn/ui CLI 安装本注册表里的组件：

### 从线上环境（GitHub Pages）安装

```bash
pnpm dlx shadcn@latest add https://erishen.github.io/shadcn-registry/r/[component-name].json
```

### 从本地开发环境安装

先启动开发服务器：

```bash
pnpm dev
```

然后在另一个项目中安装组件：

```bash
pnpm dlx shadcn@latest add http://localhost:3000/r/[component-name].json
```

### 可用组件

| 组件 | 名称 | 说明 |
|-----------|------|-------------|
| Hello World | `hello-world` | 简单的 Hello World 组件 |
| Example Form | `example-form` | 带 Zod 校验的联系表单 |
| Complex Component | `complex-component` | 含 hooks 与工具函数的高级组件 |
| Example with CSS | `example-with-css` | 自定义 CSS 样式的登录表单 |
| Demo with Button | `demo-with-button` | 按钮组件演示 |
| Demo with Header | `demo-with-header` | 头部组件演示 |
| Demo with Page | `demo-with-page` | 完整页面布局演示 |
| SCSS with Button | `scss-with-button` | SCSS 样式的按钮组件 |
| Styled Button | `styled-button` | styled-components 样式的按钮组件 |
| Data Table | `data-table` | 支持排序、筛选、分页的功能丰富数据表格 |

### 安装示例

```bash
# 安装示例表单组件
pnpm dlx shadcn@latest add https://erishen.github.io/shadcn-registry/r/example-form.json

# 安装高级组件
pnpm dlx shadcn@latest add https://erishen.github.io/shadcn-registry/r/complex-component.json
```

安装完成后，组件会被添加到项目的组件目录中，可直接使用。

## 项目结构

```
shadcn-registry/
├── app/                 # Next.js app 目录
├── components/          # React 组件
├── registry/            # 组件注册表定义
├── stories/             # Storybook stories
├── public/
│   └── r/               # 组件注册表 JSON 文件
├── .storybook/          # Storybook 配置
├── docs/                # Storybook 构建产物（生成）
└── out/                 # Next.js 构建产物（生成）
```

## 命令一览

| 命令 | 说明 |
|---------|-------------|
| `bun dev` | 启动开发服务器 |
| `bun run prod` | 构建 Next.js 项目 |
| `bun start` | 启动生产服务器 |
| `bun run lint` | 运行 ESLint |
| `bun run storybook` | 启动 Storybook 开发服务器 |
| `bun run build-storybook` | 构建 Storybook 静态站点 |
| `bun run deploy` | 构建并准备 GitHub Pages 部署 |

## 技术栈

- **框架：** Next.js 14
- **UI 库：** React 18
- **组件库：** shadcn/ui、Radix UI
- **样式：** Tailwind CSS、SCSS、styled-components
- **表单：** React Hook Form、Zod
- **文档：** Storybook 9
- **语言：** TypeScript

## 文章与资源

### 相关文章

- **掘金：** [🚀 重新定义前端组件安装体验：shadcn + Bun 的极致开发效率](https://juejin.cn/post/7591309945510821888)
- **SegmentFault：** [解决前端开发效率问题：shadcn + Bun 带来的组件安装革命](https://segmentfault.com/a/1190000047521280)
- **Medium：** [Building a Modern Component Library: The Frontend Development Revolution with shadcn + Bun](https://medium.com/@leisun8309/building-a-modern-component-library-the-frontend-development-revolution-with-shadcn-bun-9ec6e6e418f7)
- **个人博客：** [构建现代化组件库：shadcn + Bun 前端开发革命](https://erishen.cn/building-shadcn-bun-component-library-cn/)
- **个人博客（英文）：** [Building a Modern Component Library: How shadcn + Bun Revolutionize Front-End Development](https://erishen.cn/building-shadcn-bun-component-library/)

### 文章核心话题

- **「复制粘贴，而非安装」** 的设计哲学
- **Bun** 性能优化（比 npm 快 21 倍）
- **组件注册表** 架构
- **TypeScript** 集成最佳实践
- **现代化开发** 工作流

## 部署

项目通过 GitHub Actions 自动部署到 GitHub Pages，每次推送到 `main` 分支即触发。

## License

MIT

<div align="center"><a href="README.md">🇺🇸 README (English)</a></div>
