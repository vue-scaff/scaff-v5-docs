# 自定义资源

```ts
const widget = defineResourceType({
  type: 'widget',
  patterns: 'pages/*/widgets/*.ts',
  mode: 'lazy',
})
```

第三方插件可以通过 `build.resources` 贡献该定义，无需修改 Core。
