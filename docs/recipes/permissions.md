# 权限系统

```ts
export default definePlugin({
  name: 'permission',
  depends: ['router'],
  runtime: {
    prepare: (group, context) => checkAccess(group.id, context),
  },
})
```
