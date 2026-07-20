# Vue

`@scaff/vue` 把 Scaff 实例注入 Vue 应用，并解释 Vue 专属的 `page` 与 `component` 资源。页面组激活后，组件会自动注册，页面会通过 `ScaffView` 渲染。

## 创建 Vue 项目

```bash
npm create @scaff@alpha my-vue-app -- --vue
cd my-vue-app
npm run dev
```

## 启动入口

安装器生成的 `src/main.ts` 如下：

```ts
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

这段代码依次完成四件事：

1. Vite 根据目录规则生成资源清单。
2. `createVueScaff` 创建 Scaff，并通过 Vue `provide` 注入应用。
3. `setup()` 初始化插件与上下文。
4. `activate('page:home')` 只加载首页资源组，然后挂载 Vue。

## 极简应用出口

安装器生成的 `App.vue` 不承载任何业务页面：

```vue
<template>
  <ScaffView />
</template>
```

`ScaffView` 由 `createVueScaff()` 自动注册。`page:home` 激活后，它会渲染目录中发现的 `pages/home/page.vue`。

## 在页面中读取资源

安装器生成的示例页面可以直接使用自动暴露的资源：

```vue
<template>
  <p>{{ $store.home.count }}</p>
  <p>{{ $route.home.path }}</p>
  <p>{{ $i18n.home['zh-CN'].greeting }}</p>
</template>
```

如果希望在 `<script setup>` 中使用显式 API，也可以调用 `useScaffResource()`：

```vue
<script setup lang="ts">
import { useScaffResource } from '@scaff/vue'

const store = useScaffResource<{ modules: string[] }>('store:home')
</script>

<template>
  <p>{{ store.modules.length }} modules</p>
</template>
```

`useScaffResource()` 只返回已经准备完成的资源。通常由路由或应用入口先激活页面组，再由页面读取同组资源。

## 不导入组件直接使用

以下目录规则会把 Vue SFC 声明为页面组件资源：

```ts
defineResourceType({
  type: 'component',
  patterns: 'pages/*/components/*.vue',
  group: getPageGroup,
  mode: 'lazy',
})
```

例如 `pages/home/components/ResourceCard.vue` 会注册为 `ResourceCard`，`page.vue` 可以直接使用：

```vue
<template>
  <ResourceCard :resource="resource" />
</template>
```

这里没有运行时 import。组件文件和页面中的其他资源一起进入 `page:home` 懒加载边界。

## API

### `createVueScaff(options)`

创建 Scaff 实例并注入 Vue 应用。

```ts
const scaff = createVueScaff({
  app,
  manifest,
  config,
  resources,
  services,
  plugins,
  disposeOnUnmount: true,
})
```

除 `app` 外，其余字段均可选。默认情况下，Vue 应用卸载时会自动执行 `scaff.dispose()`；设置 `disposeOnUnmount: false` 可关闭这一行为。

### `useScaff()`

从当前 Vue 应用读取 Scaff。必须在已经安装 `createVueScaff` 的组件上下文中调用。

### `useScaffResource(id)`

读取已经处于 `ready` 状态的资源值。资源不存在或尚未准备完成时会抛出明确错误。

### `ScaffView`

渲染当前活动页面资源。默认由 `createVueScaff()` 注册为全局组件，也可以从 `@scaff/vue` 显式导入。

### `SCAFF_INJECTION_KEY`

公开的 Vue InjectionKey，适合需要手动注入或编写 Vue 生态插件的场景。

## 适配层不负责什么

`@scaff/vue` 不扫描文件，也不内置 Vue Router、Pinia 或完整国际化运行时。目录扫描仍由 `@scaff/vite` 负责。

默认模板中的 `$route`、`$store` 和 `$i18n` 是 Scaff 普通资源的自动暴露结果，不分别等同于 Vue Router、Pinia 和 Vue I18n。与这些生态库的连接器目前尚未内置。
