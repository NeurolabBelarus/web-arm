export default {
  target: 'static',

  // router: {
  //   base: '/web-arm/'
  // },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'FAUST VIEW',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: '' },
      { name: 'keywords', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  axios: {
    proxy: true // Can be also an object with default options
  },
  
  proxy: {
    '/api/': { target: 'http://localhost:8081/', pathRewrite: {'^/api/': '/'} }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  auth: {
    redirect: {
      home: '/',
      logout: '/login'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          type: ''
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: false,
          user: { url: '/api/auth/user', method: 'get' }
        },
      }
    }
  }
}
