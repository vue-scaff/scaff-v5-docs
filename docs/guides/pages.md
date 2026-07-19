# 页面资源

```ts
defineResourceType({
  type: 'page',
  patterns: 'pages/*/page.ts',
  group: (file) => `page:${getPageName(file)}`,
  mode: 'lazy',
})
```

::: info 待补充
将加入页面模块格式、路由联动和 `page:user` 完整激活示例。
:::
