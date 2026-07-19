# Service 资源

```ts
export default {
  greet: (name: string) => `Hello, ${name}`,
}
```

Service 可以是目录资源，也可以通过 Context 的 ServiceRegistry 由运行时插件提供。
