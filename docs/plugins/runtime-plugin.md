# 运行时插件

```ts
export default definePlugin({
  name: 'telemetry',
  runtime: {
    activate: (group) => console.info('activated', group.id),
  },
})
```

运行时阶段包括 `setup`、`prepare`、`activate`、`deactivate` 和 `dispose`。其中资源组阶段接收 `(group, context)`，`setup` 与 `dispose` 接收 `context`。
