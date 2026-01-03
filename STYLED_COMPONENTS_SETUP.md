# Styled Components 支持

本项目已完整配置 styled-components 支持。

## 配置详情

### 1. Next.js 配置 (`next.config.js`)
```javascript
compiler: {
  styledComponents: true,
}
```
- 启用 Next.js 内置的 styled-components 编译器支持
- 自动处理 SSR 和样式注入

### 2. Storybook 配置

#### main.ts
- 配置 webpack 别名确保 styled-components 正确解析
- 添加 babel-plugin-styled-components 支持
- 启用 displayName 和 fileName 选项便于调试

#### preview.ts
- 导入全局 CSS 样式
- 创建 GlobalStyle 组件支持 styled-components 全局样式
- 使用 decorator 在所有故事中应用全局样式

#### .babelrc
- 配置 Babel 使用 next/babel preset
- 确保 JSX 正确转换

### 3. 依赖

已安装的相关包：
- `styled-components@^6.1.0` - 核心库
- `@types/styled-components@^5.1.26` - TypeScript 类型
- `babel-plugin-styled-components@^2.1.4` - Babel 插件

## 使用示例

### 创建 styled-components 组件

```typescript
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background-color: #333;
  }
`;

export function MyButton() {
  return <StyledButton>Click me</StyledButton>;
}
```

### 在 Storybook 中使用

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { MyButton } from '../components/MyButton';

const meta = {
  title: 'Components/MyButton',
  component: MyButton,
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

## 热更新支持

Storybook 已配置热更新：
- 监听 `components/**/*` 和 `stories/**/*` 文件变化
- 启用 HMR (Hot Module Replacement)
- 启用 liveReload

修改 styled-components 代码后，Storybook 会自动刷新。

## 注意事项

1. **SSR 兼容性**: styled-components 已配置支持 Next.js SSR
2. **TypeScript**: 完整的类型支持
3. **性能**: 使用 babel 插件优化生产构建
4. **调试**: displayName 和 fileName 选项便于浏览器开发者工具调试

## 常见问题

### Q: 样式没有应用？
A: 确保：
1. 组件使用 `'use client'` 指令（如果在 App Router 中）
2. 在 Storybook 中运行 `bun run storybook`
3. 检查浏览器控制台是否有错误

### Q: Storybook 中样式不更新？
A: 
1. 确保 Storybook 服务器正在运行
2. 检查 `.storybook/main.ts` 中的 watchFiles 配置
3. 尝试手动刷新浏览器

### Q: 如何在全局样式中使用 styled-components？
A: 在 `.storybook/preview.ts` 中使用 `createGlobalStyle`：

```typescript
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
  }
`;
```
