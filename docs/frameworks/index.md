# 框架适配

Scaff 的核心不依赖 Vue 或 React。`@scaff/core` 管理资源、生命周期、插件和统一 Context；框架适配层只负责把这个 Context 接入具体的 UI 运行时。

```text
目录资源 → @scaff/vite → virtual:scaff-manifest → @scaff/core
                                                ├─ @scaff/vue
                                                ├─ @scaff/react
                                                └─ 自定义适配器
```

## 当前可用的适配层

| 运行方式 | 安装包 | Context 接入方式 |
|---|---|---|
| Vue 3 | `@scaff/vue@alpha` | Vue `provide / inject` |
| React | `@scaff/react@alpha` | React Context Provider |
| Core only | `@scaff/core@alpha` | 由应用直接持有 Scaff 实例 |

Vue 和 React 项目使用同一套 Resource、Manifest、Group 和生命周期协议。两个默认模板可以复用普通 TypeScript 资源规则，但 Vue SFC 与 React 组件本身仍是各自框架的代码。

但资源进入组件后的调用方式遵循各自框架的习惯：Vue 默认把资源暴露为 `$type.namespace`，React 通过 `useScaff()` 取得实例后查询资源。两者的资源协议一致，组件 API 不强行保持相同语法。

| 场景 | Vue | React |
|---|---|---|
| 获取运行时 | `useScaff()` | `useScaff()` |
| 读取资源 | `$store.home` 或 `useScaffResource('store:home')` | `getResource(scaff.context.resources, 'store:home')` |
| 页面渲染 | `ScaffView` | React 组件自行渲染 |
| 自动资源暴露 | 支持 `$store`、`$route` 等 | 当前未提供等价 API |
| 页面内组件零 import | 支持 | 当前未提供 |

## 选择一个运行时

- [接入 Vue](/frameworks/vue)
- [接入 React](/frameworks/react)
- [只使用 Core](/frameworks/core-only)

::: info 当前边界
v5 Alpha 已经完成框架无关核心、Vue/React Context 接入和资源组按需激活。Vue Router、React Router、Pinia、Zustand 与完整国际化连接器目前尚未内置。
:::
