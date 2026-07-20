# 服务

Service 用于保存页面业务逻辑、数据转换或接口封装。

## 文件路径

```text
src/pages/home/
├── page.vue
└── services/
    └── summary.ts
```

## 资源定义

下面只展示 Service 对应的规则；实际项目应保留 `resources` 中其他资源类型。

```ts
// scaff.config.ts
import { defineConfig, defineResourceType } from '@scaff/core'
import { getPageGroup } from '@scaff/utils'

export default defineConfig({
  root: 'src',
  resources: [
    defineResourceType({
      type: 'service',
      patterns: 'pages/*/services/*.ts',
      group: getPageGroup,
      mode: 'lazy',
    }),
  ],
})
```

| 文件 | Resource ID | Group | Vue 暴露位置 |
|---|---|---|---|
| `services/summary.ts` | `service:home:summary` | `page:home` | `$service.home.summary` |

## Service 代码

```ts
// src/pages/home/services/summary.ts
export default {
  describe(count: number) {
    return `当前已经完成 ${count} 次操作`
  },
}
```

## 页面中使用

```vue
<!-- src/pages/home/page.vue -->
<template>
  <p>{{ $service.home.summary.describe($store.home.count) }}</p>
</template>
```

页面不需要导入 `summary.ts`。同一目录中的多个 Service 会按文件名集中到 `$service.home` 下。
