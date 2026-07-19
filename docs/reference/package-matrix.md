# 依赖矩阵

v5 采用分体式依赖。项目只安装自己真正使用的运行时和插件，不需要因为 Scaff 被迫引入 Vue 或 React。

## 已发布的 Alpha 包

| 包 | 当前版本 | 作用 | 是否必需 |
|---|---|---|---|
| `@scaff/core` | `5.0.0-alpha.3` | 框架无关的资源、分组、namespace、生命周期、服务与插件核心 | 是 |
| `@scaff/utils` | `5.0.0-alpha.1` | 官方通用纯工具函数，例如目录约定和资源 ID | 按需使用 |
| `@scaff/vite` | `5.0.0-alpha.4` | 在构建阶段发现目录资源，生成带 namespace 的虚拟 Manifest | Vite 项目需要 |
| `@scaff/vue` | `5.0.0-alpha.4` | 接入 Vue Context，并暴露 `$type.namespace` | Vue 项目需要 |
| `@scaff/react` | `5.0.0-alpha.0` | 将 Scaff Context 接入 React | React 项目需要 |
| `@scaff/create` | `5.0.0-alpha.10` | 交互式创建 Vue、React 或 Core 项目 | 仅创建项目时使用 |

安装 v5 时请显式使用 `@alpha`：

```bash
npm install @scaff/core@alpha
```

::: warning Dist Tag
部分 Scaff 包的 npm `latest` 仍指向 v3。v5 稳定版发布前，文档中的安装命令统一使用 `@alpha`。
:::

## 项目依赖组合

| 项目类型 | dependencies | devDependencies |
|---|---|---|
| Vue | `@scaff/core`、`@scaff/vue`、`@scaff/utils`、`vue` | `@scaff/vite`、Vite、Vue Vite 插件、TypeScript |
| React | `@scaff/core`、`@scaff/react`、`@scaff/utils`、`react`、`react-dom` | `@scaff/vite`、Vite、React Vite 插件、TypeScript |
| Core only | `@scaff/core`、`@scaff/utils` | `@scaff/vite`、Vite、TypeScript |

## 规划中的可拔插包

以下名称和边界仍可能在 Alpha 阶段调整：

| 能力 | 计划形态 | 当前状态 |
|---|---|---|
| Vue Router | 独立路由插件 | 规划中 |
| React Router | 独立路由插件 | 规划中 |
| Pinia | 独立数仓插件 | 规划中 |
| Zustand | 独立数仓插件 | 规划中 |
| 国际化 | 框架适配插件或通用资源插件 | 规划中 |

Scaff Core 不会直接依赖这些生态库。插件负责把外部能力转换成 Scaff 资源和生命周期行为。
