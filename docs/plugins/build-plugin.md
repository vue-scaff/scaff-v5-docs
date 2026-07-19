# 构建期插件

```ts
export default definePlugin({
  name: 'widgets',
  build: {
    resources: [widgetDefinition],
    transformResources: (resources) => resources,
  },
})
```
