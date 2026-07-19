# 运行现有示例

这一节不写代码。先运行已经完成的调试工程，直接观察 Scaff 的行为。

## 1. 进入调试工程

```bash
cd /Users/joenix/Github/@scaff-v5-template
```

目录应该与下面类似：

```text
@scaff-v5-template/
├── src/
│   ├── pages/
│   ├── plugins/
│   └── main.ts
├── scaff.config.ts
└── vite.config.ts
```

## 2. 安装依赖

```bash
pnpm install
```

该工程通过 `link:` 使用同级源码：

```json
{
  "dependencies": {
    "@scaff/core": "link:../@scaff-v5/packages/core"
  },
  "devDependencies": {
    "@scaff/vite": "link:../@scaff-v5/packages/vite"
  }
}
```

## 3. 启动开发服务

```bash
pnpm dev
```

终端应该出现：

```text
Local: http://localhost:5173/
```

## 4. 在页面中观察什么

打开浏览器后，你会看到：

- 页面资源
- 组件资源
- 数仓资源
- 中英文语言资源
- Service、权限、校验和格式化资源
- 构建期与运行时插件执行记录
- 当前所有资源的 `idle` 或 `ready` 状态

点击“加载分析页面资源”之前，下面三个资源应该是 `idle`：

```text
page:reports
store:reports
component:reports
```

点击后，它们变成 `ready`。这证明 reports 分组此前没有执行。

## 5. 验证生产分包

```bash
pnpm build
```

`dist/assets` 中会出现 page、store、locale、service 等独立 JavaScript 文件。这些就是动态导入生成的 chunk。

[下一步：从零创建最小项目 →](/start/first-project)
