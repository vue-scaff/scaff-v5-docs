import type { DefaultTheme } from 'vitepress';

const nav: DefaultTheme.NavItem[] = [
  {
    text: '使用教程',
    link: '/guide/installation',
    activeMatch: '^/(guide|guides|tutorial|recipes|installation|start|getting-started)/',
  },
  { text: '插件教程', link: '/plugins/', activeMatch: '^/plugins/' },
  {
    text: '附录',
    link: '/concepts/resource',
    activeMatch: '^/(appendix|concepts|reference|api|advanced|build-tools|frameworks|migration|contribution)/',
  },
];

export default nav;
