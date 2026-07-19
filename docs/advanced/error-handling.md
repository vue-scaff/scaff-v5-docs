# 错误处理

```ts
try {
  await scaff.activate('page:user')
} catch (error) {
  console.error('资源分组激活失败', error)
}
```

失败资源进入 `error` 状态，错误保存在 `resource.error`。
