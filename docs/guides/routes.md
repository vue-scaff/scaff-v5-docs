# 路由

路由适合定义为页面自己的描述资源：每个页面目录包含一份 `route.ts`，路径、标题和个性化元数据与页面放在一起。

## 文件路径

```text
src/pages/
├── home/
│   ├── page.vue
│   └── route.ts
└── users/
    ├── page.vue
    └── route.ts
```

## 资源定义

在 `scaff.config.ts` 中定义路由资源：

下面只展示路由对应的规则；实际项目应保留 `resources` 中其他资源类型。

```ts
import { defineConfig, defineResourceType } from '@scaff/core'
import { getPageGroup, getPageName } from '@scaff/utils'

export default defineConfig({
  root: 'src',
  resources: [
    defineResourceType({
      type: 'route',
      patterns: 'pages/*/route.ts',
      name: getPageName,
      group: getPageGroup,
      singleton: true,
      mode: 'lazy',
    }),
  ],
})
```

结果如下：

| 文件 | Resource ID | Group | Vue 暴露位置 |
|---|---|---|---|
| `pages/home/route.ts` | `route:home` | `page:home` | `$route.home` |
| `pages/users/route.ts` | `route:users` | `page:users` | `$route.users` |

## 路由代码

路由对象可以保存页面自己的个性化信息：

```ts
// src/pages/users/route.ts
export default {
  name: 'users',
  path: '/users',
  title: '用户管理',
  layout: 'admin',
  meta: {
    requiresAuth: true,
    permission: 'user:read',
  },
}
```

Scaff 不限制对象字段。这里的 `layout`、`meta` 和 `permission` 是应用自行约定的数据。

## 页面中使用

`page:users` 激活后，Vue 页面不需要导入 `route.ts`：

```vue
<!-- src/pages/users/page.vue -->
<template>
  <header>
    <h1>{{ $route.users.title }}</h1>
    <code>{{ $route.users.path }}</code>
  </header>
</template>
```

## 与真实路由库的关系

当前 `route.ts` 是 Scaff 资源描述，并不会自动创建 Vue Router 或 React Router 的路由，也不会在地址变化时自动执行：

```ts
await scaff.deactivate('page:home')
await scaff.activate('page:users')
```

这部分需要未来的路由插件，或由应用暂时自行连接。

## 个性化路由的加载建议

路由和普通页面资源存在一个顺序差异：应用必须先知道 `/users` 对应 `page:users`，才能决定激活哪个页面组。如果把所有 `route.ts` 都放在各自页面组内懒加载，就会出现“还不知道路由，所以不知道该加载哪个路由文件”的问题。

因此，更适合真实路由接入的方式是：

1. `route.ts` 仍放在对应页面目录中，保持页面归属清晰。
2. 所有轻量路由描述进入独立的 `routing` 组。
3. 应用启动时先激活 `routing`，建立路由表。
4. 地址匹配成功后，只激活目标 `page:*` 资源组。

```ts
defineResourceType({
  type: 'route',
  patterns: 'pages/*/route.ts',
  name: getPageName,
  namespace: getPageName,
  group: () => 'routing',
  expose: 'scaffRoute',
  singleton: true,
  mode: 'eager',
})
```

```ts
await scaff.activate('routing')

// 路由匹配到 /users 后：
await scaff.activate('page:users')
```

这种配置会提前加载体积很小的路由描述，但不会提前加载 `page.vue`、组件、数仓和 Service。

::: info 当前状态
上述分层现在可以由应用或自定义插件实现，但官方 Vue Router、React Router 插件尚未发布。默认安装模板仍采用便于展示资源命名空间的 `page:home` 路由资源配置。
:::

::: warning Vue Router 名称冲突
Vue Router 自身使用 `$route`。默认 Scaff 示例没有安装 Vue Router，因此 `$route.home` 可以使用；如果现有项目已经安装 Vue Router，应暂时把资源定义改为 `expose: 'scaffRoute'`，页面使用 `$scaffRoute.users`，避免全局属性冲突。
:::

```ts
defineResourceType({
  type: 'route',
  patterns: 'pages/*/route.ts',
  name: getPageName,
  group: getPageGroup,
  expose: 'scaffRoute',
  singleton: true,
  mode: 'lazy',
})
```
