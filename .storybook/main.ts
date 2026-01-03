import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ],
  "core": {
    "disableTelemetry": true,
    "builder": {
      "name": "@storybook/builder-webpack5",
      "options": {
        "fsCache": true,
        "lazyCompilation": true
      }
    }
  },
  "webpackFinal": async (config: any) => {
    // 确保 styled-components 正确处理
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "styled-components": require.resolve("styled-components"),
      };
    }
    
    // 启用热模块替换
    if (config.devServer) {
      config.devServer.hot = true;
      config.devServer.liveReload = true;
      config.devServer.watchFiles = ['../components/**/*', '../stories/**/*'];
    }
    
    // 确保 watch 模式启用
    config.watch = true;
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
      ignored: /node_modules/,
    };
    
    return config;
  }
};
export default config;