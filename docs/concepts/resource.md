# Resource

Resource 是运行时最小单元，包含身份、分组、加载器、缓存策略、状态和值。

状态流转：`idle → loading → ready`，失败时进入 `error`。
