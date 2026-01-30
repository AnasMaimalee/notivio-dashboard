// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  /* ===============================
     GLOBAL CSS
  ================================ */
  css: [
    '~/assets/css/main.css',
    'ant-design-vue/dist/reset.css',
  ],

  /* ===============================
     MODULES
  ================================ */
  modules: [
    '@nuxt/a11y',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],

  /* ===============================
     COLOR MODE
     (we control it manually)
  ================================ */
  colorMode: {
    classSuffix: '',
    preference: 'light', // let backend decide
    fallback: 'light'
  },

  /* ===============================
     VITE
  ================================ */
  vite: {
    plugins: [tailwindcss()]
  },

  /* ===============================
     RUNTIME CONFIG (RGB ONLY)
  ================================ */
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8001/api',
    },
  },

  /* ===============================
     APP META
  ================================ */
  app: {
    head: {
      title: 'Notivio',
      meta: [
        { name: 'description', content: 'Collaborative jotting app' }
      ],
      style: [
        {
          children: `
            :root {
              --primary-color: #A084D6;
            }
          `,
        },
      ],
    }
  }
})
