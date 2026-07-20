# 整体架构

Scaff v5 将目录发现、资源生命周期和 UI 框架接入拆成独立层：

```text
业务目录
   ↓
构建适配器（当前为 @scaff/vite）
   ↓
virtual:scaff-manifest
   ↓
@scaff/core（Registry、Group、Plugin、Context）
   ↓
Vue / React / Core only
```

依赖方向始终由外层指向 Core。Core 不依赖 Vite、Vue 或 React，因此后续可以增加其他构建工具和运行时适配器。

## 一次资源组激活

以 `page:home` 为例：

1. Vite 在启动或构建时发现目录中的资源，并生成惰性加载器。
2. 应用调用 `scaff.activate('page:home')`。
3. Core 并行准备该组中尚未就绪的资源。
4. Core 执行插件的 `prepare` 与 `activate` 生命周期。
5. Vue 适配器注册该组组件、暴露 `$type.home`，并让 `ScaffView` 渲染页面。

当前尚未内置“路由变化自动调用第 2 步”的连接器。这属于路由插件，而不是 Core 的既有能力。
