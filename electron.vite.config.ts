import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import { htmlTemplate } from "./plugins/html_template";

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    plugins: [
      vue(),
      htmlTemplate({
        APP_VERSION: `${process.env.npm_package_version}`,
      }),
    ]
  }
})
