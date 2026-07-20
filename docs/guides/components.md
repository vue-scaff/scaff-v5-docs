# 组件资源

在 Scaff 中，“组件”首先是一种资源类型，而不是被 Core 写死的 Vue 或 React 组件。它可以是组件描述、组件工厂，也可以是由框架插件理解的真实组件模块。

## 默认示例

安装器会生成一个最小组件资源：

```ts
// src/pages/home/component.ts
export default {
  name: 'ScaffWelcome',
}
```

安装器已经在 `scaff.config.ts` 中预置了组件目录规则：

```ts
defineResourceType({
  type: 'component',
  patterns: 'pages/*/component.ts',
  name: getPageName,
  group: getPageGroup,
  mode: 'lazy',
})
```

这是一次性的资源类型声明，不是逐个组件注册。之后只要文件符合这个目录规则，Scaff 就会自动发现它们，不需要再调用 `app.component()`，也不需要在页面中逐个 import。

因此 `src/pages/home/component.ts` 会成为 `component:home`，并归入 `page:home` 资源组。只有激活 `page:home` 时，它才会被加载。

## Vue 中使用

```vue
<script setup lang="ts">
import { getResource } from '@scaff/core'
import { useScaff } from '@scaff/vue'

const scaff = useScaff()
const component = getResource<{ name: string }>(
  scaff.context.resources,
  'component:home',
)
</script>

<template>
  <p>{{ component.value?.name }}</p>
</template>
```

## React 中使用

```ts
import { getResource } from '@scaff/core'
import { useScaff } from '@scaff/react'
import { createElement } from 'react'

export default function ComponentName() {
  const scaff = useScaff()
  const component = getResource<{ name: string }>(
    scaff.context.resources,
    'component:home',
  )

  return createElement('p', null, component.value?.name)
}
```

## Vue 组件的自动注册

在 Vue 模板中，默认规则会匹配：

```text
src/pages/*/components/*.vue
```

例如：

```text
src/pages/home/components/ResourceCard.vue
src/pages/user/components/UserCard.vue
```

激活对应页面组后，Vue 适配器会自动加载并注册这些组件。页面可以直接使用组件名称：

```vue
<template>
  <ResourceCard />
</template>
```

不需要这样做：

```ts
import ResourceCard from './components/ResourceCard.vue'
app.component('ResourceCard', ResourceCard)
```

## 扩展为自定义组件目录

Scaff 可以发现 `.vue`、`.tsx` 等模块，但 Core 不解释它们。推荐由对应框架插件负责以下工作：

1. 只有在使用非默认目录时，才需要声明新的组件文件匹配规则。
2. 约定组件资源 ID 和所属资源组。
3. 在资源激活后注册、渲染或暴露给业务。
4. 在资源组停用时执行必要的清理。

这种边界让目录配置和按需加载保持通用，同时避免 `@scaff/core` 绑定任何 UI 框架。
