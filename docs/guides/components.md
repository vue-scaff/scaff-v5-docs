# 组件

Vue 页面组件可以和页面放在同一目录组中，激活后直接使用组件名。

## 文件路径

```text
src/pages/home/
├── page.vue
└── components/
    └── ResourceCard.vue
```

## 资源定义

下面只展示组件对应的规则；实际项目应保留 `resources` 中其他资源类型。

```ts
// scaff.config.ts
import { defineConfig, defineResourceType } from '@scaff/core'
import { getPageGroup } from '@scaff/utils'

export default defineConfig({
  root: 'src',
  resources: [
    defineResourceType({
      type: 'component',
      patterns: 'pages/*/components/*.vue',
      group: getPageGroup,
      mode: 'lazy',
    }),
  ],
})
```

| 文件 | Resource ID | Group | 注册名称 |
|---|---|---|---|
| `pages/home/components/ResourceCard.vue` | `component:home:ResourceCard` | `page:home` | `ResourceCard` |

## 组件代码

```vue
<!-- src/pages/home/components/ResourceCard.vue -->
<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <article class="resource-card">
    <h2>{{ title }}</h2>
    <slot />
  </article>
</template>
```

## 页面中使用

```vue
<!-- src/pages/home/page.vue -->
<template>
  <ResourceCard title="Store">
    {{ $store.home.count }}
  </ResourceCard>
</template>
```

页面不需要 `import ResourceCard`，也不需要调用 `app.component()`。

## TypeScript 类型声明

当前 Alpha 版本会在运行时自动注册组件，但尚未自动生成 Vue 全局组件类型。新增组件后，需要在 `src/components.d.ts` 中补充类型声明：

```ts
import type ResourceCard from './pages/home/components/ResourceCard.vue'

declare module 'vue' {
  export interface GlobalComponents {
    ResourceCard: typeof ResourceCard
  }
}

export {}
```

这是类型导入，不会进入页面业务代码或运行时 bundle。

## React 当前边界

`@scaff/react` 当前只有 Context 接入，尚未提供与 Vue 等价的自动组件注册和零 import JSX 使用能力。
