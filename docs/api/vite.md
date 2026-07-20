# `@scaff/vite`

## 默认导出

```ts
import scaff from '@scaff/vite'

scaff({ config })
```

创建 Vite 插件。参数类型为：

```ts
interface ScaffViteOptions {
  config?: ScaffBuildConfig
}
```

## 具名导出

| 导出 | 作用 |
|---|---|
| `createScaffVitePlugin` | 默认导出的具名形式 |
| `discoverResources` | 根据已解析配置发现资源 |
| `createManifestModule` | 生成虚拟 Manifest 模块代码 |
| `SCAFF_VIRTUAL_MODULE_ID` | `virtual:scaff-manifest` 常量 |
| `RESOLVED_SCAFF_VIRTUAL_MODULE_ID` | Vite 内部解析后的虚拟模块 ID |

`@scaff/vite` 负责构建阶段发现，不负责资源激活、框架渲染或路由联动。
