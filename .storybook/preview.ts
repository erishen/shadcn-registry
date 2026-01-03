import type { Preview } from '@storybook/react'
import '../app/globals.css'
import { createGlobalStyle } from 'styled-components'
import React from 'react'

// 创建全局样式以支持 styled-components
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    layout: 'padded',
  },
  decorators: [
    (Story: any) => React.createElement(
      React.Fragment,
      null,
      React.createElement(GlobalStyle),
      React.createElement(Story)
    ),
  ],
};

export default preview;