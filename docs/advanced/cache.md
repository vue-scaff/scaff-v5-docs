# 缓存策略

```ts
defineResourceType({
  type: 'command',
  patterns: 'commands/*.ts',
  cache: false,
})
```

非缓存资源不会把返回值保存在 Resource.value 中，应在使用时调用 `loadResource()`。
