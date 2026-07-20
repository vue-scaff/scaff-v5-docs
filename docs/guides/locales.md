# 国际化

每个页面可以拥有自己的语言资源文件。

## 文件路径

```text
src/pages/home/
├── page.vue
└── locales/
    ├── zh-CN.ts
    └── en-US.ts
```

## 资源定义

下面只展示国际化对应的规则；实际项目应保留 `resources` 中其他资源类型。

```ts
// scaff.config.ts
import { defineConfig, defineResourceType } from '@scaff/core'
import { getPageGroup } from '@scaff/utils'

export default defineConfig({
  root: 'src',
  resources: [
    defineResourceType({
      type: 'i18n',
      patterns: 'pages/*/locales/*.ts',
      group: getPageGroup,
      mode: 'lazy',
    }),
  ],
})
```

| 文件 | Resource ID | Group | Vue 暴露位置 |
|---|---|---|---|
| `locales/zh-CN.ts` | `i18n:home:zh-CN` | `page:home` | `$i18n.home['zh-CN']` |
| `locales/en-US.ts` | `i18n:home:en-US` | `page:home` | `$i18n.home['en-US']` |

## 语言资源代码

```ts
// src/pages/home/locales/zh-CN.ts
export default {
  greeting: '你好，Scaff',
  actions: {
    submit: '提交',
  },
}
```

```ts
// src/pages/home/locales/en-US.ts
export default {
  greeting: 'Hello, Scaff',
  actions: {
    submit: 'Submit',
  },
}
```

## 页面中使用

```vue
<!-- src/pages/home/page.vue -->
<template>
  <h1>{{ $i18n.home['zh-CN'].greeting }}</h1>
  <button>{{ $i18n.home['zh-CN'].actions.submit }}</button>
</template>
```

页面不需要导入语言文件。

## 当前边界

`$i18n` 当前是语言资源集合，不是 Vue I18n。语言切换、回退、插值和格式化尚未由 Scaff 内置。
