import type { DefaultTheme } from 'vitepress';

const guideSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '开始使用',
    items: [
      { text: '安装', link: '/guide/installation' },
      { text: '页面资源分组', link: '/tutorial/first-page-group' },
    ],
  },
  {
    text: '内置资源',
    items: [
      { text: '页面', link: '/guides/pages' },
      { text: '路由', link: '/guides/routes' },
      { text: '数仓', link: '/guides/stores' },
      { text: '组件', link: '/guides/components' },
      { text: '国际化', link: '/guides/locales' },
      { text: '服务', link: '/guides/services' },
      { text: '自定义资源', link: '/guides/custom-resources' },
      { text: '工具函数', link: '/guides/utils' },
    ],
  },
  {
    text: '示例场景',
    items: [
      { text: '管理后台', link: '/recipes/admin-project' },
      { text: '页面资源组', link: '/recipes/page-resource-group' },
      { text: '权限控制', link: '/recipes/permissions' },
    ],
  },
];

const pluginSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '插件教程',
    items: [
      { text: '插件是什么', link: '/plugins/' },
      { text: '定义插件', link: '/plugins/define-plugin' },
      { text: '构建期插件', link: '/plugins/build-plugin' },
      { text: '运行时插件', link: '/plugins/runtime-plugin' },
      { text: '第三方插件包', link: '/plugins/external-package' },
    ],
  },
];

const appendixSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '设计原理',
    items: [
      { text: 'Resource', link: '/concepts/resource' },
      {
        text: 'ResourceDefinition',
        link: '/concepts/resource-definition',
      },
      { text: 'Manifest', link: '/concepts/manifest' },
      { text: 'Context', link: '/concepts/context' },
      { text: 'Group', link: '/concepts/resource-group' },
      { text: '生命周期', link: '/concepts/lifecycle' },
    ],
  },
  {
    text: 'API',
    items: [
      { text: 'Core API', link: '/api/core' },
      { text: '公共类型', link: '/api/types' },
      { text: 'Vite API', link: '/api/vite' },
    ],
  },
  {
    text: '构建与框架适配',
    items: [
      { text: 'Vite 适配器', link: '/build-tools/vite' },
      { text: '自定义构建适配器', link: '/build-tools/custom-adapter' },
      { text: 'Vue 适配器', link: '/frameworks/vue' },
      { text: 'React 适配器', link: '/frameworks/react' },
    ],
  },
  {
    text: '运行与维护',
    items: [
      { text: '加载模型', link: '/advanced/loading-model' },
      { text: '缓存', link: '/advanced/cache' },
      { text: '异常处理', link: '/advanced/error-handling' },
      { text: '性能清单', link: '/advanced/performance-checklist' },
    ],
  },
  {
    text: '迁移与参考',
    items: [
      { text: '从 v3 迁移到 v5', link: '/migration/v3-to-v5' },
      { text: '迁移检查表', link: '/migration/checklist' },
      { text: '包与状态', link: '/reference/package-matrix' },
      { text: '术语表', link: '/reference/glossary' },
      { text: '常见问题', link: '/reference/faq' },
      { text: '故障排查', link: '/reference/troubleshooting' },
      { text: '路线图', link: '/reference/roadmap' },
    ],
  },
];

const sidebar: DefaultTheme.Sidebar = {
  '/guide/': guideSidebar,
  '/guides/': guideSidebar,
  '/tutorial/': guideSidebar,
  '/recipes/': guideSidebar,
  '/installation/': guideSidebar,
  '/start/': guideSidebar,
  '/getting-started/': guideSidebar,

  '/plugins/': pluginSidebar,

  '/appendix/': appendixSidebar,
  '/concepts/': appendixSidebar,
  '/api/': appendixSidebar,
  '/build-tools/': appendixSidebar,
  '/frameworks/': appendixSidebar,
  '/advanced/': appendixSidebar,
  '/migration/': appendixSidebar,
  '/reference/': appendixSidebar,
  '/contribution/': appendixSidebar,
};

export default sidebar;
