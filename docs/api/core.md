# `@scaff/core`

`@scaff/core` 不依赖 Vue、React 或 Vite。下面只列出当前包入口实际导出的 API。

## 定义配置

| API | 作用 |
|---|---|
| `defineResource` | 保留并约束单个运行时资源定义 |
| `defineResourceType` | 定义一种目录资源的匹配、命名、分组和加载方式 |
| `defineManifest` | 定义 Manifest |
| `definePlugin` | 定义构建期或运行时插件 |
| `defineConfig` | 定义 Scaff 构建配置 |
| `definePreset` | 定义可复用配置预设 |

这些 `define*` 函数主要提供类型约束，不会自行扫描目录或启动运行时。

## 创建与生命周期

```ts
import { createScaff } from '@scaff/core'

const scaff = createScaff({ manifest, plugins })

await scaff.setup()
await scaff.prepare('page:home')
await scaff.activate('page:home')
await scaff.deactivate('page:home')
await scaff.dispose()
```

| API | 作用 |
|---|---|
| `createScaff` | 创建 Scaff 实例 |
| `createContext` | 创建底层 Context |
| `resolveGroup` | 从 Registry 解析资源组 |

`prepare()` 加载并准备资源组；`activate()` 会在需要时先准备再激活；`deactivate()` 结束该组的活动状态；`dispose()` 释放整个实例。

## 资源 Registry

| API | 作用 |
|---|---|
| `loadResource` | 执行单个资源的加载器并更新状态 |
| `createResourceRegistry` | 创建资源 Registry |
| `registerResource` | 注册运行时资源 |
| `getResource` | 按 ID 读取资源记录 |
| `listResources` | 按条件列出资源记录 |
| `normalizeResourceExposure` | 规范化资源暴露名称 |
| `resolveResourceNamespace` | 根据分组解析默认命名空间 |

`getResource()` 返回的是包含 `status`、`value`、`error` 等字段的资源记录，不是直接返回资源值。

## 插件、服务和配置

| API | 作用 |
|---|---|
| `createPluginRegistry`、`registerPlugin`、`sortPlugins`、`runPluginStage` | 插件注册、排序与阶段执行 |
| `createServiceRegistry`、`provideService`、`useService`、`removeService` | 运行时 Service Registry |
| `mergeConfig`、`resolveConfig`、`collectResourceDefinitions` | 配置合并、解析和资源规则收集 |
| `createManifestResources` | 将 Manifest 条目转换为运行时资源 |

## 兼容工具

`getPageName` 和 `getPageGroup` 仍从 Core 导出，但新项目应从 `@scaff/utils` 导入。通用工具的完整说明见[工具函数](/guides/utils)。

## 类型

包入口还导出资源、插件、构建配置、Context、Scaff、Group、Definition 和 Manifest 相关 TypeScript 类型。类型名称以当前包入口的声明文件为准。
