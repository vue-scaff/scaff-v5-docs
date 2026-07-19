# 运行时插件

```ts
export default definePlugin({
  name: 'telemetry',
  runtime: {
    activate: ({ id }) => console.info('activated', id),
  },
})
```
