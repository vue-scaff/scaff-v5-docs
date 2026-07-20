# 什么是 Scaff

Scaff 是一套结构配置式的应用资源协议：构建阶段根据目录规则发现文件，将它们描述为 Manifest；运行阶段由 Core 按 Group 管理资源的加载、激活、停用和释放。

它与传统项目生成器的区别是，安装器只负责创建项目，Scaff 运行时仍持续管理应用资源。它也不是路由库、状态管理库或自动 import 编译器；这些能力可以围绕统一的 Resource 与 Plugin 协议接入。

当前 Vue 适配器已经提供页面渲染、页面内组件注册和 `$type.namespace` 资源暴露。React 适配器目前只提供 Context 接入，能力边界见[框架适配](/frameworks/)。
