import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
/* path模块是node.js的内置模块     不支持ts若使用->npm install @types/node -D */
import path from 'path';

import { svgBuilder } from './src/plugins/svgBuilder';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),  // 开启 vue 支持

        svgBuilder('./src/assets/icons/')

    ],
    base: './', // index.html 中静态资源加载位置
    // 因为 npm 只要一个启动命令 而要启动项目需要 Vite 和 Electron 各一个
    // 所以我们借助 concurrently 来同时启动 Vite 和 Electron
    // 例如： "dev": "concurrently \"npm run vite\" \"npm run electron\""
    // 添加别名
    resolve: {
        /*定义全局路径*/
        alias: {
            '@': path.resolve(__dirname, './src'),
            // '^': path.resolve(__dirname, './src/views'),
            // '#': path.resolve(__dirname, './src/components')
        }
    },
})