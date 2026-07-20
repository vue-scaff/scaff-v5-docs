# 运行示例

最直接的方式是用公网安装器创建 Vue 示例：

```bash
npm create @scaff@alpha scaff-demo -- --vue
cd scaff-demo
npm run dev
```

页面会展示默认 `page:home` 组中的页面、组件、数仓、路由描述、国际化、Service、Feature 和 Permission 自定义资源。

可以从源码验证这些行为：

- `src/App.vue` 只包含 `<ScaffView />`
- 页面主体位于 `src/pages/home/page.vue`
- `ResourceCard` 在页面中使用，但没有业务 import
- 数仓通过 `$store.home` 使用
- 自定义插件资源通过 `$permission.home` 使用
- `src/main.ts` 显式执行 `scaff.activate('page:home')`

执行生产检查：

```bash
npm run typecheck
npm run build
```

构建成功表示模板、类型声明和惰性资源导入可以被当前 Vite 配置处理。它不代表尚未安装的路由或状态库连接器也已经存在。
