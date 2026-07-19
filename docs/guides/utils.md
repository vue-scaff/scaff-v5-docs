# 工具函数

`@scaff/utils` 是 Scaff 官方提供的通用工具包。它不依赖 Vue、React 或 Vite，适合在业务代码、插件和测试代码中使用。

## 安装

```bash
npm install @scaff/utils@alpha
```

也可以使用 pnpm 或 Yarn：

```bash
pnpm add @scaff/utils@alpha
yarn add @scaff/utils@alpha
```

## 目录约定工具

### `getPageName`

从 `pages/<name>/...` 路径中取得页面名称：

```ts
import { getPageName } from '@scaff/utils';

getPageName('src/pages/home/page.vue');
// "home"

getPageName('src\\pages\\admin\\page.vue');
// "admin"
```

### `getPageGroup`

根据页面路径生成资源组名称：

```ts
import { getPageGroup } from '@scaff/utils';

getPageGroup('src/pages/home/page.vue');
// "page:home"
```

它通常和 `defineResourceType` 一起使用：

```ts
import { defineConfig, defineResourceType } from '@scaff/core';
import { getPageGroup, getPageName } from '@scaff/utils';

export default defineConfig({
  root: 'src',
  resources: [
    defineResourceType({
      type: 'store',
      patterns: 'pages/*/store.ts',
      name: getPageName,
      group: getPageGroup,
      singleton: true,
      mode: 'lazy',
    }),
  ],
});
```

这样，`src/pages/home/store.ts` 会被注册为 `store:home`，并归属于 `page:home` 资源组。

## 资源 ID 工具

### `createResourceId`

按照 Scaff 统一规则创建资源 ID：

```ts
import { createResourceId } from '@scaff/utils';

createResourceId('store', 'home', 'home');
// "store:home"

createResourceId('i18n', 'home', 'zh-CN');
// "i18n:home:zh-CN"
```

当资源名称和命名空间相同，或资源属于全局命名空间时，ID 使用简写形式；否则会保留命名空间。

### `parseResourceId`

把资源 ID 解析为结构化对象：

```ts
import { parseResourceId } from '@scaff/utils';

parseResourceId('store:home');
// { type: 'store', namespace: 'global', name: 'home' }

parseResourceId('i18n:home:zh-CN');
// { type: 'i18n', namespace: 'home', name: 'zh-CN' }
```

传入格式不正确的 ID 会抛出异常，适合在插件参数校验和调试工具中使用。

## 和 Core 的关系

Core 仍然保留 `getPageName` 和 `getPageGroup` 的兼容导出：

```ts
import { getPageName } from '@scaff/core';
```

新代码建议直接从 `@scaff/utils` 引入工具函数。这样可以让只需要工具函数的插件或业务代码不必依赖整个运行时。

`@scaff/utils` 只负责纯函数；资源注册、生命周期、插件运行时仍由 `@scaff/core` 负责。
