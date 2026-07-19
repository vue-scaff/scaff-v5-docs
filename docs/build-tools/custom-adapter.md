# 自定义构建适配器

自定义适配器需要完成三件事：发现 ResourceDefinition、生成 ScaffManifest、在文件新增或删除时使 Manifest 失效。

::: info 编写中
后续将以最小 Rollup 插件伪代码展示适配器边界。
:::
