# React

`@scaff/react` 负责创建带 React 运行时标记的 Scaff 实例，并通过 `ScaffProvider` 把统一 Context 提供给组件树。

## 创建 React 项目

```bash
npm create @scaff@alpha my-react-app -- --react
cd my-react-app
npm run dev
```

## 启动入口

安装器生成的 `src/main.ts` 如下：

```ts
import manifest from 'virtual:scaff-manifest'
import { createReactScaff, ScaffProvider } from '@scaff/react'
import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.js'

const target = document.querySelector<HTMLElement>('#app')

if (target === null) {
  throw new Error('Missing #app element')
}

const scaff = createReactScaff({ manifest })

await scaff.setup()
await scaff.activate('page:home')

createRoot(target).render(
  createElement(
    StrictMode,
    null,
    createElement(ScaffProvider, { scaff }, createElement(App)),
  ),
)
```

`ScaffProvider` 只传递上下文。资源发现、分组、按需加载和生命周期仍由 `@scaff/vite` 与 `@scaff/core` 完成。

React 不提供 Vue 式的 `$store.home` 全局属性。默认示例通过 `useScaff()` 获取实例，再由页面模型读取资源：

```tsx
import { getResource } from '@scaff/core'
import { useScaff } from '@scaff/react'

export default function Home() {
  const scaff = useScaff()
  const store = getResource<{ count: number }>(
    scaff.context.resources,
    'store:home',
  )

  return <p>{store.value?.count}</p>
}
```

这和 Vue 的资源 ID、分组和激活规则相同，差异只在组件层的读取方式。

## 在组件中读取资源

```ts
import { getResource } from '@scaff/core'
import { useScaff } from '@scaff/react'
import { createElement } from 'react'

export default function App(): ReturnType<typeof createElement> {
  const scaff = useScaff()
  const page = getResource<{ title: string }>(
    scaff.context.resources,
    'page:home',
  )

  return createElement('h1', null, page.value?.title)
}
```

## API

### `createReactScaff(options?)`

创建 Scaff 实例。可传入 `manifest`、`config`、`resources`、`services` 和 `plugins`。

### `<ScaffProvider scaff={scaff}>`

向 React 组件树提供同一个 Scaff 实例。

### `useScaff()`

读取最近一层 `ScaffProvider` 提供的实例。在 Provider 外调用会抛出明确错误。

### `ScaffContext`

公开的 React Context，适合编写更底层的 React 生态集成。

## 卸载与清理

React 适配层当前不会猜测根节点何时销毁。应用主动卸载 React Root 时，应一并释放 Scaff：

```ts
root.unmount()
await scaff.dispose()
```

## 适配层不负责什么

`@scaff/react` 不扫描文件，也不内置 React Router、Zustand 或国际化。它们将通过独立插件把对应资源挂接到 Scaff 生命周期。
