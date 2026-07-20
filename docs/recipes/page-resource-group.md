# 页面资源分组

```ts
const group = (file: string) => `page:${getPageName(file)}`
```

同一目录的 page、store、component 和 locale 使用相同 group。应用执行 `scaff.activate('page:home')` 时，该组中尚未就绪的资源会被准备并加载。

当前路由访问不会自行触发 `activate()`；这一步需要应用入口显式执行，或由未来的路由连接器完成。
