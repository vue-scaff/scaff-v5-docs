# 让一个页面同时加载多种资源

上一节只有 `page:user` 一个资源。这一节给用户页面增加 Store 和 Component。

最终目录：

```text
src/pages/user/
├── page.ts
├── store.ts
└── component.ts
```

三个文件属于同一个 `page:user` 分组。调用一次：

```ts
await scaff.activate('page:user')
```

三个资源就会并行加载。

## 1. 创建 Store

```ts
// src/pages/user/store.ts
const state = {
  users: ['Ada', 'Grace'],
}

export default {
  state,
  add(name: string) {
    state.users.push(name)
  },
}
```

## 2. 创建 Component

这里暂时不依赖 Vue 或 React，用普通对象演示组件资源：

```ts
// src/pages/user/component.ts
export default {
  name: 'UserCard',
  description: '用户信息卡片',
}
```

## 3. 增加两种目录规则

修改完整的 `scaff.config.ts`：

```ts
// scaff.config.ts
import {
  defineConfig,
  defineResourceType,
} from '@scaff/core'
import { getPageGroup, getPageName } from '@scaff/utils'

export default defineConfig({
  root: 'src',

  resources: [
    defineResourceType({
      type: 'page',
      patterns: 'pages/*/page.ts',
      mode: 'lazy',
      name: getPageName,
      group: getPageGroup,
    }),

    defineResourceType({
      type: 'store',
      patterns: 'pages/*/store.ts',
      mode: 'lazy',
      name: getPageName,
      group: getPageGroup,
    }),

    defineResourceType({
      type: 'component',
      patterns: 'pages/*/component.ts',
      mode: 'lazy',
      name: getPageName,
      group: getPageGroup,
    }),
  ],
})
```

注意三个定义使用同一个 `getPageGroup`，因此会生成：

| 文件 | 资源 ID | Group |
|---|---|---|
| `page.ts` | `page:user` | `page:user` |
| `store.ts` | `store:user` | `page:user` |
| `component.ts` | `component:user` | `page:user` |

资源 ID 不同，所以不会冲突；Group 相同，所以会一起加载。

## 4. 使用加载结果

```ts
// src/main.ts
import manifest from 'virtual:scaff-manifest'
import {
  createScaff,
  getResource,
} from '@scaff/core'

const scaff = createScaff({ manifest })

await scaff.activate('page:user')

const page = getResource<{ title: string }>(
  scaff.context.resources,
  'page:user',
)

const store = getResource<{
  state: { users: string[] }
}>(
  scaff.context.resources,
  'store:user',
)

const component = getResource<{
  name: string
  description: string
}>(
  scaff.context.resources,
  'component:user',
)

console.log({
  page: page.value?.title,
  users: store.value?.state.users,
  component: component.value?.name,
})
```

浏览器控制台应该输出：

```text
{
  page: '用户页面已经加载',
  users: ['Ada', 'Grace'],
  component: 'UserCard'
}
```

## 5. Scaff 内部发生了什么

```text
activate('page:user')
        ↓
找到三个属于 page:user 的资源
        ↓
Promise.all([
  import('page.ts'),
  import('store.ts'),
  import('component.ts')
])
        ↓
三个 Resource 状态变为 ready
```

如果再调用一次 `activate('page:user')`，默认缓存资源不会再次执行 loader。

## 6. 验证其他页面不会加载

再创建 `src/pages/reports/page.ts`，但不要调用：

```ts
scaff.activate('page:reports')
```

此时 `page:reports` 会注册为 `idle`，但文件内容不会执行。这就是页面数量增加时仍能控制首屏开销的基础。

[继续了解 Resource 状态 →](/concepts/resource)
