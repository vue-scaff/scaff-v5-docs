import { defineConfig } from 'vitepress';

import nav from './nav.js';
import sidebar from './sidebar.js';

export default defineConfig({
  lang: 'zh-CN',
  title: 'Scaff v5.0',
  description: '目录驱动、插件优先、框架无关的应用资源运行时',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#e54865' }],
    ['meta', { name: 'author', content: 'Scaff' }],
  ],
  themeConfig: {
    logo: { src: '/logo.svg', alt: 'Scaff v5.0' },
    nav,
    sidebar,
    outline: {
      level: [2, 3],
      label: '本页内容',
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除查询',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: { dateStyle: 'medium', timeStyle: 'short' },
    },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    footer: {
      message: '目录即配置 · 资源即插件 · Context 即运行时',
      copyright: 'Scaff v5 documentation',
    },
  },
});
