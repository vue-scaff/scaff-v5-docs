# 接入 Vite

安装器生成的项目会在 `vite.config.ts` 中使用 Scaff 构建插件：

```ts
import { defineConfig } from 'vite'
import scaff from '@scaff/vite'
import vue from '@vitejs/plugin-vue'
import scaffConfig from './scaff.config.js'

export default defineConfig({
  plugins: [vue(), scaff({ config: scaffConfig })],
})
```

也可以使用同一个函数的具名导出：

```ts
import { createScaffVitePlugin } from '@scaff/vite'
```

上例是 Vue 项目的完整插件数组；React 项目把 `vue()` 换成 `react()`。`scaff.config.ts` 声明项目根目录、资源规则和 Scaff 构建插件。Vite 插件在开发启动或构建时发现匹配文件，并生成 `virtual:scaff-manifest`。
