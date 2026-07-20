# 缓存策略

```ts
defineResourceType({
  type: 'command',
  patterns: 'commands/*.ts',
  cache: false,
})
```

`cache: false` 的资源仍会把最近一次加载结果写入 `Resource.value`。所属活动组停用时，Core 会删除该值并把资源恢复为 `idle`；以后重新激活该组时会再次执行 loader。

通常由资源组生命周期触发加载；只有编写底层集成时才需要直接调用 `loadResource(resource)`。
