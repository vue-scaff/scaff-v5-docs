# FAQ

## Scaff 一定依赖 Vite 吗？

不依赖。Core 与 Vite 解耦，`@scaff/vite` 只是当前第一个构建工具适配器。

## 页面越多，首屏越慢吗？

页面资源默认可以生成动态 import，未激活的 Group 不会执行对应模块。
