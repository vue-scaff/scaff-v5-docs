# 项目状态

以下状态以当前已发布的 Alpha 包和安装器默认模板为准。

| 包 | 版本 | 当前能力 |
|---|---:|---|
| `@scaff/core` | `5.0.0-alpha.3` | 资源、Manifest、分组生命周期、插件、Context 与 Service Registry |
| `@scaff/utils` | `5.0.0-alpha.1` | 页面命名和资源 ID 等通用工具 |
| `@scaff/vite` | `5.0.0-alpha.4` | 目录资源发现、虚拟 Manifest、惰性或立即导入 |
| `@scaff/vue` | `5.0.0-alpha.4` | Vue 注入、`ScaffView`、页面渲染、组件注册和 `$type.namespace` 暴露 |
| `@scaff/react` | `5.0.0-alpha.0` | React Context、Provider 和 `useScaff()` |
| `@scaff/create` | `5.0.0-alpha.10` | Vue、React、Core-only 项目生成与依赖安装 |

## 当前尚未内置

- 路由变化自动激活对应资源组
- Vue Router 与 React Router 适配
- Pinia、Zustand 等状态库适配
- 完整国际化运行时
- React 组件资源的零 import 消费 API
- 专门的资源热更新协议

::: warning Alpha
当前 API 仍可能调整。文档中标为“规划”或“尚未内置”的能力，不应视为现在可直接使用的功能。
:::
