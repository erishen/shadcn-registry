# Next.js 生产环境镜像（静态导出 - Bun）
FROM oven/bun:1-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 安装依赖
COPY package.json bun.lock ./
# 删除 prepare 脚本以避免 husky 安装错误
RUN sed -i '/"prepare":/d' package.json || true
RUN bun install --frozen-lockfile && bun pm cache rm

# 构建应用
FROM oven/bun:1-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY tsconfig.json ./
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN bun install autoprefixer postcss tailwindcss --dev
RUN apk add --no-cache python3 make g++
RUN bun run prod

# 生产环境 - 静态文件服务器
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/out ./out
COPY --from=builder /app/public ./public

# 创建自定义服务器以支持子路径和静态资源
RUN printf '%s\n' 'const express = require("express");' \
  'const path = require("path");' \
  'const fs = require("fs");' \
  'const app = express();' \
  'const PORT = process.env.PORT || 3000;' \
  'const basePath = "/shadcn-registry";' \
  '' \
  '// 设置静态文件服务' \
  'const outDir = path.join(__dirname, "out");' \
  '' \
  '// 服务 basePath 下的静态文件' \
  'app.use(basePath, express.static(outDir));' \
  '' \
  '// SPA 路由：返回 index.html 对于 basePath 下的非静态文件请求' \
  'app.use(basePath, (req, res, next) => {' \
  '    if (req.method === "GET" && !req.path.includes(".")) {' \
  '        const indexPath = path.join(outDir, "index.html");' \
  '        if (fs.existsSync(indexPath)) {' \
  '            res.sendFile(indexPath);' \
  '        } else {' \
  '            next();' \
  '        }' \
  '    } else {' \
  '        next();' \
  '    }' \
  '});' \
  '' \
  '// 根路径重定向到 basePath' \
  'app.use((req, res) => {' \
  '    if (req.path === "/") {' \
  '        res.redirect(basePath);' \
  '    } else {' \
  '        res.status(404).send("Not Found");' \
  '    }' \
  '});' \
  '' \
  'app.listen(PORT, () => {' \
  '    console.log(`Server running on port ${PORT}`);' \
  '});' > server.js

RUN npm install express --production

EXPOSE 3000

CMD ["node", "server.js"]

