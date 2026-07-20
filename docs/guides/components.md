# 组件

## Vue

把 Vue 组件放在页面的 `components` 目录中：

```text
src/pages/home/components/ResourceCard.vue
```

在页面中直接使用组件名称：

```vue
<template>
  <ResourceCard />
</template>
```

不需要：

```ts
import ResourceCard from './components/ResourceCard.vue'
app.component('ResourceCard', ResourceCard)
```

默认 Vue 项目已经配置好了这个目录规则。只有当你把组件放到其他目录时，才需要在 `scaff.config.ts` 中增加对应规则。

## React

React 组件仍然按照 React 的方式使用：

```tsx
import ResourceCard from './components/ResourceCard.js'

export default function Home() {
  return <ResourceCard />
}
```

React 不使用 Vue 式的全局组件注册。组件是否按需加载，由目录规则和资源组决定；组件在 JSX 中仍然遵循 React 的导入和组合方式。

## 自定义组件目录

如果组件不在默认目录中，例如：

```text
src/shared/components/Button.vue
```

可以增加一条目录规则：

```ts
defineResourceType({
  type: 'component',
  patterns: 'shared/components/*.vue',
  group: () => 'global',
  mode: 'lazy',
})
```

普通项目不需要修改这部分配置，直接使用默认目录即可。
