// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: [
    '@nuxt/a11y',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],
  colorMode: {
      classSuffix: '',
      preference: 'system',
      fallback: 'light'
    },
   vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  runtimeConfig: {
    public: {
      defaultPrimary: process.env.APP_PRIMARY_COLOR || '#4f46e5',
      defaultSecondary: process.env.APP_SECONDARY_COLOR || '#10b981',
      apiBase: 'http://localhost:8001/api', // Laravel backend
    },
  },

  css: [
    '~/assets/css/main.css',
    'ant-design-vue/dist/antd.css'
  ],

  app: {
    head: {
      title: 'Notivio',
      meta: [
        { name: 'description', content: 'Collaborative jotting app' },
      ],
    },
  },

})