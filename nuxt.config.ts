// eslint-disable-next-line no-unused-vars
import { Configuration } from '@nuxt/types';

const isDev = process.env.NODE_ENV === 'development';

const config: Configuration = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_title || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    './assets/styles/index.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue-easy-lightbox', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    ['@nuxt/typescript-build', {
      typeCheck: true,
      ignoreNotFoundWarnings: true
    }],
  ],

  server: {
    port: 3333,
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    ['bootstrap-vue/nuxt', {
      bootstrapCSS: false,
      bootstrapVueCSS: false,
    }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    // '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    credentials: false,
    host: isDev ? 'localhost' : 'saliuk.herokuapp.com',
    https: true,
    port: isDev ? '3000' : '443',
    prefix: '/maria',
  },

  auth: {
    redirect: {
      home: '/',
      login: '/sign-in',
      logout: '/sign-in',
      callback: '/sign-in',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'accessToken',
          },
          logout: true,
          user: { url: '/auth/user', method: 'get', propertyName: false },
        },
        tokenRequired: true,
        tokenType: 'bearer',
      },
    },
  },

  styleResources: {
    scss: ['./assets/styles/_variables.scss'],
  },

  router: {
    middleware: ['auth'],
  },
  /*
  ** Build configuration
  */
  build: {
    babel: {
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }]
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
};

export default config;