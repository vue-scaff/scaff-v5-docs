import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';

import ScaffMindMap from '../components/ScaffMindMap.vue';
import ScaffHomeContent from '../components/ScaffHomeContent.vue';

import './style.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ScaffHomeContent', ScaffHomeContent);
    app.component('ScaffMindMap', ScaffMindMap);
  },
} satisfies Theme;
