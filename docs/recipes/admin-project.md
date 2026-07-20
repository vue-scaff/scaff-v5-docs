# 后台管理系统

```text
src/pages/
├── dashboard/
├── users/
├── permissions/
└── reports/
```

这是一种适合后台应用的页面目录划分示意，不是当前模板已经内置的完整后台方案。

每个页面目录可以拥有自己的 `page`、`store`、`components`、`locales` 和权限资源。布局嵌套、真实路由守卫与状态库集成仍需应用代码或对应插件实现。
