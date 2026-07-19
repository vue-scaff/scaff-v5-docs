# 生命周期

```text
setup → prepare(group) → activate(group) → deactivate(group) → dispose
```

资源在 prepare 阶段并行加载，插件可以参与每个阶段。
