# 定义插件

```ts
import { definePlugin } from '@scaff/core'

export default definePlugin({
  name: 'analytics',
  after: ['router'],
})
```

`depends` 表示强依赖，目标插件不存在时 Scaff 会报错；`before` 和 `after` 只在目标插件存在时调整执行顺序。
