# Vite 适配器

```ts
import { defineConfig } from 'vite'
import scaff from '@scaff/vite'
import vue from '@vitejs/plugin-vue'
import scaffConfig from './scaff.config.js'

export default defineConfig({
  plugins: [vue(), scaff({ config: scaffConfig })],
})
```

这是 Vue 项目的配置；React 项目使用 `@vitejs/plugin-react`。应用通过 `virtual:scaff-manifest` 获取生成结果。
