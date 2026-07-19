# 接入 Vite

在 `vite.config.ts` 中安装 Scaff 构建插件：

```ts
import { defineConfig } from 'vite';
import { scaff } from '@scaff/vite';

import scaffConfig from './scaff.config';

export default defineConfig({
  plugins: [scaff(scaffConfig)],
});
```

`scaff.config.ts` 负责声明要扫描的目录和资源定义。下一步的验证教程会给出一个可以直接运行的完整配置。
