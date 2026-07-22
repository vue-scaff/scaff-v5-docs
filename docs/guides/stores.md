# 数仓

Store 保存页面状态，并通过同页面 Service 完成异步数据操作。

`defineStore()` 和 Service 注入由已发布的 `@scaff/data` 提供。

## 文件路径

```text
src/pages/users/
├── page.vue
├── store.ts
└── services/
    └── users.ts
```

## 资源定义

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
| `pages/users/store.ts` | `store:users` | `page:users` | `$store.users` |

## Store 代码

```ts
// src/pages/users/store.ts
import {
  defineStore,
  type DataFactoryValue,
  type StoreFactoryContext,
} from '@scaff/data'

import type usersService from './services/users.js'
import type { User } from './services/users.js'

type UsersService = DataFactoryValue<typeof usersService>

export default defineStore(({
  service,
}: StoreFactoryContext<{ users: UsersService }>) => ({
  loading: false,
  users: [] as User[],

  async load() {
    this.loading = true

    try {
      this.users = await service.users.list()
    } finally {
      this.loading = false
    }
  },
}))
```

## 页面中使用

```vue
<!-- src/pages/users/page.vue -->
<template>
  <button :disabled="$store.users.loading" @click="$store.users.load()">
    加载用户
  </button>

  <p v-for="user in $store.users.users" :key="user.id">
    {{ user.name }}
  </p>
</template>
```

页面不需要导入 Store 或 Service，也不需要为资源再声明一层变量。

## 当前边界

Vue 适配器会把 Store 对象转换为响应式对象。React 适配器目前尚未提供 Store 订阅 Hook，因此 React 中修改 Store 不会自动触发组件重渲染。
