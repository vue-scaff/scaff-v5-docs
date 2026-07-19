# 按需加载模型

```ts
await scaff.activate('page:user')
```

该调用会准备 `global` 与 `page:user` 资源，并行执行对应 loader；其他页面分组保持 `idle`。
