# 页面

页面是一个资源组的渲染入口。下面以安装器生成的 Vue 项目为准。

## 文件路径

```text
src/
├── App.vue
├── main.ts
└── pages/
    └── home/
        └── page.vue
```

目录名 `home` 同时决定页面名称和资源组名称。

## 资源定义

在 `scaff.config.ts` 中定义页面文件规则：

下面只展示页面对应的规则；实际项目应保留 `resources` 中其他资源类型。

```ts
import { defineConfig, defineResourceType } from '@scaff/core'
import { getPageGroup, getPageName } from '@scaff/utils'

export default defineConfig({
  root: 'src',
  resources: [
    defineResourceType({
      type: 'page',
      patterns: 'pages/*/page.vue',
      name: getPageName,
      group: getPageGroup,
      singleton: true,
      mode: 'lazy',
    }),
  ],
})
```

这条规则会生成：

| 文件 | Resource ID | Group | Vue 暴露位置 |
|---|---|---|---|
| `pages/home/page.vue` | `page:home` | `page:home` | 由 `ScaffView` 渲染 |

## 页面代码

```vue
<!-- src/pages/home/page.vue -->
<template>
  <main>
    <h1>Home</h1>
    <p>页面主体位于 pages/home，而不是 App.vue。</p>
  </main>
</template>
```

## 应用出口

`App.vue` 不承载业务页面，只保留页面出口：

```vue
<!-- src/App.vue -->
<template>
  <ScaffView />
</template>
```

`createVueScaff()` 会自动注册 `ScaffView`。应用入口激活页面组后再挂载 Vue：

```ts
// src/main.ts
import manifest from 'virtual:scaff-manifest'
import { createVueScaff } from '@scaff/vue'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
const scaff = createVueScaff({ app, manifest })

await scaff.setup()
await scaff.activate('page:home')

app.mount('#app')
```

## 当前边界

当前示例由入口显式激活 `page:home`。路由地址变化还不会自动切换页面组，相关边界见[路由](/guides/routes)。
