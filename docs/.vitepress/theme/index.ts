import DefaultTheme from 'vitepress/theme'
import ModuleBrowser from './components/ModuleBrowser.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ModuleBrowser', ModuleBrowser)
  },
} satisfies Theme
