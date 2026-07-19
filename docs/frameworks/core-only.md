# Core only

不使用 Vue 或 React 时，可以直接持有 `@scaff/core` 创建的实例。目录发现、资源分组、按需加载和插件生命周期仍然可用。

## 创建项目

```bash
npm create @scaff@alpha my-core-app -- --core
cd my-core-app
npm run dev
```

## 最小运行入口

```ts
import manifest from 'virtual:scaff-manifest'
import { createScaff, getResource } from '@scaff/core'

const scaff = createScaff({ manifest })

await scaff.activate('page:home')

const page = getResource<{ title: string }>(
  scaff.context.resources,
  'page:home',
)

document.querySelector('#app')!.textContent = page.value?.title ?? ''
```

Core only 适合无 UI 框架的 Web 应用、服务层、测试环境，以及开发自定义框架适配器。
