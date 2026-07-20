# 权限资源

默认 Vue 模板用构建期插件贡献 `permission` 资源类型：

```ts
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

页面组激活后，Vue 页面可以通过 `$permission.home.access` 使用对应文件。该示例只演示自定义资源扩展，不包含路由守卫、鉴权服务或完整权限系统。
