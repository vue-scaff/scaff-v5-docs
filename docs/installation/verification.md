# 验证安装

创建并运行一个全新的 Vue 项目：

```bash
npm create @scaff@alpha scaff-check -- --vue
cd scaff-check
npm run dev
```

页面应展示由 `page:home` 组加载的页面、组件、数仓、国际化、Service 和自定义插件资源。

再执行：

```bash
npm run typecheck
npm run build
```

两条命令都成功，才表示生成文件、TypeScript 类型和生产构建在当前环境中可用。
