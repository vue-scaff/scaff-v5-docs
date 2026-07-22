# 服务

Service 用于封装服务端接口、外部 SDK 或业务用例，不用于代替普通格式化函数。

`defineService()` 和 Request 注入由已发布的 `@scaff/data` 提供。

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

| 文件 | Resource ID | Group | 注入 Store 时的名称 |
|---|---|---|---|
| `services/users.ts` | `service:users:users` | `page:users` | `service.users` |

## Service 代码

```ts
// src/pages/users/services/users.ts
import { defineService } from '@scaff/data'

export interface User {
  id: number
  name: string
}

export default defineService(({ request }) => ({
  list: () => request.get<User[]>('/api/users'),
  remove: (id: number) => request.delete(`/api/users/${id}`),
}))
```

Request 由 Data 插件注入，Service 文件不创建全局请求实例。

## Store 中使用

```ts
export default defineStore(({
  service,
}: StoreFactoryContext<{ users: UsersService }>) => ({
  users: [] as User[],

  async load() {
    this.users = await service.users.list()
  },
}))
```

页面通常只调用 `$store.users.load()`，而不是直接发请求。完整示例见[数据请求](/guides/data)。
