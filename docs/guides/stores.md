# 数仓资源

```ts
export default {
  state: { count: 0 },
  increment() {
    this.state.count += 1
  },
}
```

数仓文件可以作为普通资源加载；Pinia、Zustand 等由独立框架插件适配。
