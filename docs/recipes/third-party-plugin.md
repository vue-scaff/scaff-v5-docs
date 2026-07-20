# 个性化插件

第三方包可以导出一个由 `definePlugin()` 定义的插件。应用将它加入 `scaff.config.ts` 的 `plugins` 后，插件便可以贡献资源规则或运行时生命周期。

```ts
// @company/scaff-permission
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

当前仓库的 Vue 安装模板包含同类的本地 `permission` 示例，但尚未单独发布官方权限插件包。
