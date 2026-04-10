import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'GWEN Modules',
  description: 'Browse official and community modules for the GWEN game engine',
  base: '/modules/',
  themeConfig: {
    nav: [
      { text: 'Browse Modules', link: '/browse' },
      { text: 'Submit a Module', link: '/contributing' },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/gwenjs/modules' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 GWEN contributors',
    },
  },
})
