# 路线图

路线图只记录已经完成的基础能力和接下来的工程重点。Alpha 阶段的包名与 API 仍可能调整。

## 已完成

- [x] 框架无关的 `@scaff/core`
- [x] 基于 Vite 的目录发现与虚拟 Manifest
- [x] 资源分组、懒加载、激活与停用生命周期
- [x] 运行时插件、服务注册和统一 Context
- [x] Vue 3 适配层
- [x] React 适配层
- [x] Vue、React、Core only 三种安装器模板
- [x] 公网 npm Alpha 包发布

## 下一阶段

- [ ] 将路由变化映射为资源组激活与停用
- [ ] 提供 Vue Router 与 React Router 插件
- [ ] 提供 Pinia 与 Zustand 数仓插件
- [ ] 提供国际化资源插件与参考实现
- [ ] 完善错误边界、调试信息和开发者工具接口
- [ ] 稳定配置格式、插件协议和公共类型

## 稳定版之前

- [ ] 补齐端到端用例与兼容性矩阵
- [ ] 明确各包的语义化版本策略
- [ ] 为 v3 项目提供迁移说明
- [ ] 将 v5 从 `alpha` 推进到 `beta`、`rc` 和 `latest`

你可以通过[依赖矩阵](/reference/package-matrix)确认某项能力当前是否已经发布。
