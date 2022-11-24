export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ismael Benadjal',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: "author", name: "author", content: "Ismael Benadjal"},
      { hid: "description", name: "description", content: "Portfolio Website showcasing different project I have worked on and displaying my techincal skills."},
      { hid: "keywords", name: "keywords", content: "Ismael, Benadjal, Ismael Benadjal, Computer Science, Programming, Programmer, Software Development, Portfolio, Projects"}
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/starsBackground/starsBackground.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{src: '~/assets/starsBackground/starsBackground.js', mode: 'client'}],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    
  },

  routeRules: {    // Static page generated on-demand, revalidates in background
    '/': { swr: true }
  },
  server: {
    host: '127.0.0.1',
    port: 3000 // default: 3000
  }
}
