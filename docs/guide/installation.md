# 安装

<div class="scaff-requirements" aria-label="环境要求">
  <div class="scaff-requirement">
    <span class="scaff-requirement__icon scaff-requirement__icon--node">⬢</span>
    <span class="scaff-requirement__name">Node.js <code>&gt;= 20.19</code></span>
  </div>
  <div class="scaff-requirement">
    <span class="scaff-requirement__icon scaff-requirement__icon--vite">ϟ</span>
    <span class="scaff-requirement__name">Vite <code>&gt;= 6</code></span>
  </div>
  <div class="scaff-requirement">
    <span class="scaff-requirement__icon scaff-requirement__icon--scaff">α</span>
    <span class="scaff-requirement__name">Scaff <code>5.0 alpha</code></span>
  </div>
</div>

目前最简单的使用方式是通过安装器创建项目。安装器会生成文件，并默认调用当前包管理器安装依赖。

## 创建项目

::: code-group

```bash [npm]
npm create @scaff@alpha my-app
```

```bash [pnpm]
pnpm create @scaff@alpha my-app
```

```bash [Yarn]
yarn create @scaff@alpha my-app
```

:::

::: tip 为什么使用 `@alpha`
v5 仍处于 Alpha 阶段。显式写出 `@alpha` 可以避免安装到仍由 v3 使用的 `latest` 标签。
:::

## 选择运行框架

安装器会询问项目使用哪个框架：

```text
◆  Select a framework
│  ● Vue (Vue 3 application)
│  ○ React
│  ○ Core only
│  ↑/↓ to navigate • Enter: confirm
```

使用方向键选择、按回车确认，默认会创建 Vue 项目。也可以在命令中明确指定：

```bash
npm create @scaff@alpha my-vue-app -- --vue
npm create @scaff@alpha my-react-app -- --react
npm create @scaff@alpha my-core-app -- --core
```

如只想生成文件，不希望立即安装依赖：

```bash
npm create @scaff@alpha my-app -- --vue --no-install
```

## 三种项目有什么区别

| 选择 | 运行依赖 | 适合场景 |
|---|---|---|
| Vue | `@scaff/core`、`@scaff/vue`、`@scaff/utils`、`vue` | Vue 3 应用 |
| React | `@scaff/core`、`@scaff/react`、`@scaff/utils`、`react`、`react-dom` | React 应用 |
| Core only | `@scaff/core` | 无 UI 框架、服务层或自定义适配器 |

三种项目都会安装 `@scaff/vite`、Vite 和 TypeScript。Vue 模板还会把 `page.vue` 与 `components/*.vue` 声明为可渲染资源；Core 和 React 保留各自的运行时入口。

## 启动和验证

```bash
cd my-app
npm run dev
```

浏览器会打开一个完整示例页。Vue 模板从 `page:home` 目录按需发现页面、组件、内容、数仓、路由、国际化、服务和插件资源。

Vue 模板的 `App.vue` 只保留 `<ScaffView />`。真正的页面结构位于 `src/pages/home/page.vue`，页面直接使用 `$store.home`、`$route.home`、`$i18n.home`、`$service.home` 和插件资源，不导入任何业务资源实现文件。

发布前可以执行完整检查：

```bash
npm run typecheck
npm run build
```

## 手动接入已有项目

如果不使用安装器，可按框架安装依赖。

::: code-group

```bash [Vue]
npm install @scaff/core@alpha @scaff/vue@alpha @scaff/utils@alpha vue
npm install --save-dev @scaff/vite@alpha @vitejs/plugin-vue vite
```

```bash [React]
npm install @scaff/core@alpha @scaff/react@alpha @scaff/utils@alpha react react-dom
npm install --save-dev @scaff/vite@alpha @vitejs/plugin-react vite
```

```bash [Core only]
npm install @scaff/core@alpha @scaff/utils@alpha
npm install --save-dev @scaff/vite@alpha vite
```

:::

下一步从[页面资源分组](/tutorial/first-page-group)理解 Scaff 如何把同一页面的多种资源放进一个按需加载边界。
