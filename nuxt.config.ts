// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    devServer: {
    port: 8000
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://msgs.skvdmt.ru/api/v1',
      timeout: 5000,
    }
  },
  css: [
    '~/assets/css/main.css'
  ],
  app: {
    head: {
      link: [
        { 
          rel: 'shortcut icon', 
          href: 'https://msgs.skvdmt.ru/icons/favicon.ico', 
          type: 'image/x-icon' 
        },
        { 
          rel: 'icon', 
          href: 'https://msgs.skvdmt.ru/icons/favicon_32x32.png', 
          sizes: '32x32', 
          type: 'image/png'
        },
        { 
          rel: 'icon', 
          href: 'https://msgs.skvdmt.ru/icons/favicon_48x48.png', 
          sizes: '48x48', 
          type: 'image/png' 
        },
        { 
          rel: 'icon', 
          href: 'https://msgs.skvdmt.ru/icons/favicon_96x96.png', 
          sizes: '96x96', 
          type: 'image/png' 
        },
        { 
          rel: 'icon', 
          href: 'https://msgs.skvdmt.ru/icons/favicon_144x144.png', 
          sizes: '144x144', 
          type: 'image/png' 
        }
      ]
    }
  }
})
