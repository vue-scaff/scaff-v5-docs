# Scaff 是做什么的

先看一个普通项目中经常发生的事情。

你为“用户页面”创建了页面、数仓和局部组件：

```text
src/pages/user/
├── page.ts
├── store.ts
└── component.ts
```

如果没有 Scaff，你通常还要在其他位置手工完成这些工作：

- 把页面加入路由配置
- 把 Store 加入状态管理
- 注册页面需要的组件
- 决定这些文件应该立即加载还是动态加载
- 页面离开时处理对应状态

Scaff 想做的是：**目录已经表达了这些文件属于同一个页面，就不要再让开发者到其他文件重复声明这层关系。**

## Scaff 实际做了三件事

### 1. 构建时发现文件

你告诉 Scaff 页面文件的目录规则：

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
      name: getPageName,
      group: getPageGroup,
      mode: 'lazy',
    }),
  ],
})
```

`@scaff/vite` 会在 Vite 启动或构建时找到匹配文件。

### 2. 为文件生成加载方式

lazy 资源会变成类似下面的代码：

```ts
loader: () => import('/src/pages/user/page.ts')
```

这意味着文件不会因为出现在目录里就立即执行。

### 3. 在需要时激活一组资源

```ts
await scaff.activate('page:user')
```

Scaff 找到属于 `page:user` 的资源，并行加载它们，然后把结果保存在统一 Context 中。

## Scaff 不是什么

Scaff 不是路由库、状态管理库或 UI 组件库。

它负责组织和加载 Scaff 资源。Vue Router、Pinia、React Router、Zustand 等生态库需要独立连接器；这些官方连接器目前尚未内置。

## 暂时不要记术语

目前只需要记住：

> 文件放进约定目录，构建时自动发现；对应资源组被激活时，再加载这个组的资源。

[下一步：运行现有示例 →](/start/run-template)
