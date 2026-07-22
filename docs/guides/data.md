# 数据请求

`@scaff/data` 把 Request、Service 和 Store 连接成一条页面级数据链：

```text
Request → Service → Store → Page
```

::: tip 已发布
`@scaff/data@5.0.0-alpha.0` 已发布到 npm，Vue 默认安装模板已内置本页的 Request → Service → Store 示例。
:::

## 文件路径

```text
src/
├── main.ts
└── pages/
    └── users/
        ├── page.vue
        ├── store.ts
        └── services/
            └── users.ts
```

## 资源定义

Service 和 Store 仍然使用普通的 Scaff 目录规则：

```ts
// scaff.config.ts
import { defineConfig, defineResourceType } from '@scaff/core'
import { getPageGroup, getPageName } from '@scaff/utils'

export default defineConfig({
  root: 'src',
  resources: [
    defineResourceType({
      type: 'service',
      patterns: 'pages/*/services/*.ts',
      group: getPageGroup,
      mode: 'lazy',
    }),
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

## 安装运行时插件

Data 插件必须在创建 Scaff 时加入运行时插件数组：

```ts
// src/main.ts
import { createDataPlugin } from '@scaff/data'

const scaff = createVueScaff({
  app,
  manifest,
  plugins: [
    createDataPlugin({
      request: {
        baseURL: '/api',
        headers: () => ({
          Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
        }),
      },
    }),
  ],
})
```

Data 插件在 Vue 暴露资源前执行，因此页面拿到的 `$service` 和 `$store` 已经是完成依赖注入的实例。

## Service 代码

```ts
// src/pages/users/services/users.ts
import { defineService } from '@scaff/data'

export interface User {
  id: number
  name: string
}

export default defineService(({ request }) => ({
  list: () => request.get<User[]>('/users'),
  detail: (id: number) => request.get<User>(`/users/${id}`),
  create: (input: Pick<User, 'name'>) =>
    request.post<User>('/users', input),
}))
```

Service 不需要创建或导入 Request 实例，`request` 由 Data 插件作为参数传入。

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
  error: '',
  users: [] as User[],

  async load() {
    this.loading = true
    this.error = ''

    try {
      this.users = await service.users.list()
    } catch (error: unknown) {
      this.error = error instanceof Error ? error.message : String(error)
    } finally {
      this.loading = false
    }
  },
}))
```

Store 自动获得同一 `page:users` 组中的 Service 集合，所以使用 `service.users`，不需要重复书写页面 namespace。

## 页面中使用

```vue
<!-- src/pages/users/page.vue -->
<template>
  <button
    type="button"
    :disabled="$store.users.loading"
    @click="$store.users.load()"
  >
    加载用户
  </button>

  <p v-if="$store.users.error">{{ $store.users.error }}</p>

  <ul>
    <li v-for="user in $store.users.users" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
</template>
```

页面不导入 Request、Service 或 Store。

## 当前请求能力

第一版 Request Client 已支持：

- `baseURL` 和动态默认 Headers
- GET、POST、PUT、PATCH、DELETE
- Query 参数
- JSON Body 和常见原生 Body 类型
- 超时与 `AbortSignal`
- JSON 或文本响应解析
- 带状态码、Response 和响应数据的 `ScaffRequestError`

请求/响应拦截器、重试、缓存和并发去重尚未实现，不应按已有 API 使用。
