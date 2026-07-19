# 故障排查

## 找不到虚拟 Manifest

确认 Vite 配置中已经添加：

```ts
plugins: [scaff({ config: scaffConfig })]
```

## 资源一直是 idle

确认调用的 Group 与 ResourceDefinition 的 group 解析结果一致。
