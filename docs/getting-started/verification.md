# 验证与调试

在安装器生成的项目目录中执行：

```bash
npm run typecheck
npm run build
```

开发时还可以在浏览器 Network 面板确认惰性资源产生的请求；未激活的页面组不应执行对应模块。
