# 按需加载模型

```ts
await scaff.activate('page:user')
```

该调用只准备 `page:user` 组，并行执行该组资源的 loader；其他页面分组保持 `idle`。

Core 不会隐式激活名为 `global` 的组。如果项目定义了全局资源组，需要由应用显式激活。
