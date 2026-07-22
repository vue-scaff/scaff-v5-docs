# `@scaff/data`

::: tip 当前版本
`@scaff/data@5.0.0-alpha.0` 已发布到 npm，安装时请使用 `@alpha`。
:::

## 创建 Request Client

```ts
import { createRequest } from '@scaff/data'

const request = createRequest({
  baseURL: '/api',
  headers: () => ({ Authorization: 'Bearer token' }),
})
```

公开方法：`request()`、`get()`、`post()`、`put()`、`patch()` 和 `delete()`。

## 创建 Data 插件

```ts
import { createDataPlugin } from '@scaff/data'

createDataPlugin({
  request: {
    baseURL: '/api',
  },
})
```

`request` 既可以是 Request 配置，也可以是已经创建的 `ScaffRequestClient`。

## 定义资源工厂

```ts
import { defineService, defineStore } from '@scaff/data'
```

- `defineService(factory)`：创建 Service 工厂，自动获得 Request。
- `defineStore(factory)`：创建 Store 工厂，自动获得当前 Group 中的 Service。
- `DataFactoryValue<T>`：取得工厂最终实例类型。
- `ServiceFactoryContext`、`StoreFactoryContext`：工厂参数类型。

Service 与 Store 工厂必须同步返回实例；异步操作应放在实例方法中。

## 错误

HTTP 非成功状态会抛出 `ScaffRequestError`：

```ts
interface ScaffRequestError<T> extends Error {
  status: number
  response: Response
  data: T
}
```
