# Vite 适配器

```ts
import { defineConfig } from 'vite'
import scaff from '@scaff/vite'
import scaffConfig from './scaff.config'

export default defineConfig({
  plugins: [scaff({ config: scaffConfig })],
})
```

应用通过 `virtual:scaff-manifest` 获取生成结果。
