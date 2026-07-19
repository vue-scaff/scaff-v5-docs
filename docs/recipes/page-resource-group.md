# 页面资源分组

```ts
const group = (file: string) => `page:${getPageName(file)}`
```

同一目录的 page、store、component 和 locale 使用相同 group，即可在访问页面时并行加载。
