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

Vue 和 React 项目共享同一份目录发现规则、资源 ID、资源分组和生命周期。框架变化时，业务资源的组织方式不需要随之重写。

但资源进入组件后的调用方式遵循各自框架的习惯：Vue 默认把资源暴露为 `$type.namespace`，React 通过 `useScaff()` 取得实例后查询资源。两者的资源协议一致，组件 API 不强行保持相同语法。

| 场景 | Vue | React |
|---|---|---|
| 获取运行时 | `useScaff()` | `useScaff()` |
| 读取资源 | `$store.home` 或 `useScaffResource('store:home')` | `getResource(scaff.context.resources, 'store:home')` |
| 页面渲染 | `ScaffView` | React 组件自行渲染 |
| 全局属性 | 支持 `$store`、`$route` 等 | 使用 React Context 和组件状态 |

## 选择一个运行时

- [接入 Vue](/frameworks/vue)
- [接入 React](/frameworks/react)
- [只使用 Core](/frameworks/core-only)

::: info 当前边界
v5 Alpha 已经完成框架无关核心、Vue/React Context 接入和资源按需激活。Vue Router、React Router、Pinia、Zustand 与国际化仍将作为独立插件接入，不属于适配层本身。
:::
