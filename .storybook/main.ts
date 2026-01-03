import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
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
    "disableTelemetry": true
  },
  "webpackFinal": async (config: any) => {
    // 确保 styled-components 正确处理
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "styled-components": require.resolve("styled-components"),
      };
    }
    return config;
  }
};
export default config;