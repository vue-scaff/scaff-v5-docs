# 自定义资源

Scaff 不把资源类型限制为页面、数仓或组件。下面以默认 Vue 示例中的权限资源为例。

## 文件路径

```text
src/
├── plugins/
│   └── permission.ts
└── pages/
    └── home/
        ├── page.vue
        └── permissions/
            └── access.ts
```

## 资源定义

插件通过 `build.resources` 贡献新的目录规则：

```ts
// src/plugins/permission.ts
import { definePlugin, defineResourceType } from '@scaff/core'
import { getPageGroup } from '@scaff/utils'

export default definePlugin({
  name: 'permission',
  build: {
    resources: [
      defineResourceType({
        type: 'permission',
        patterns: 'pages/*/permissions/*.ts',
        group: getPageGroup,
        mode: 'lazy',
      }),
    ],
  },
})
```

在 `scaff.config.ts` 中安装插件：

```ts
import { defineConfig } from '@scaff/core'
import permissionPlugin from './src/plugins/permission.js'

export default defineConfig({
  root: 'src',
  plugins: [permissionPlugin],
})
```

| 文件 | Resource ID | Group | Vue 暴露位置 |
|---|---|---|---|
| `permissions/access.ts` | `permission:home:access` | `page:home` | `$permission.home.access` |

## 资源代码

```ts
// src/pages/home/permissions/access.ts
export default {
  can(action: 'read' | 'edit') {
    return action === 'read'
  },
}
```

## 页面中使用

```vue
<!-- src/pages/home/page.vue -->
<template>
  <button v-if="$permission.home.access.can('edit')">
    编辑
  </button>
</template>
```

业务页面不需要了解插件怎样扫描文件，只需要使用插件约定的 `$permission.home.access`。

## 命名规则

默认暴露根来自 `type`：`permission` 对应 `$permission`；页面目录名形成 namespace：`home`；文件名形成资源名：`access`。因此最终访问路径是 `$permission.home.access`。
