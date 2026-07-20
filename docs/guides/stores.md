# 数仓

数仓文件放在所属页面目录中，页面组激活时一起加载。

## 文件路径

```text
src/pages/home/
├── page.vue
└── store.ts
```

## 资源定义

下面只展示数仓对应的规则；实际项目应保留 `resources` 中其他资源类型。

```ts
// scaff.config.ts
import { defineConfig, defineResourceType } from '@scaff/core'
import { getPageGroup, getPageName } from '@scaff/utils'

export default defineConfig({
  root: 'src',
  resources: [
    defineResourceType({
      type: 'store',
      patterns: 'pages/*/store.ts',
      name: getPageName,
      group: getPageGroup,
      singleton: true,
      mode: 'lazy',
    }),
  ],
})
```

| 文件 | Resource ID | Group | Vue 暴露位置 |
|---|---|---|---|
| `pages/home/store.ts` | `store:home` | `page:home` | `$store.home` |

## 数仓代码

```ts
// src/pages/home/store.ts
export default {
  count: 0,
  status: 'synchronized',
  increment() {
    this.count += 1
  },
}
```

Vue 适配器会把普通对象转换为响应式对象。

## 页面中使用

```vue
<!-- src/pages/home/page.vue -->
<template>
  <p>Status: {{ $store.home.status }}</p>
  <button type="button" @click="$store.home.increment()">
    Count: {{ $store.home.count }}
  </button>
</template>
```

页面不需要导入 `store.ts`，也不需要再次定义变量。

## 当前边界

`$store.home` 是 Scaff 管理的响应式资源，不是 Pinia、Vuex 或 Zustand Store。对应状态库插件目前尚未内置。
