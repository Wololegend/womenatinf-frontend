export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'womenatinf-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/markdownit'
  ],

  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    use: [
      'markdown-it-div',
      'markdown-it-attrs'
    ]
  },

  fontawesome: {
    icons: {
      solid: ['faEnvelope','faEnvelopeOpen','faSearch','faEdit',
              'faArrowLeft','faEyeSlash','faEye','faChevronDown',
              'faUpload','faBell','faCheck','faInfoCircle','faTrashAlt',
              'faClipboard','faCircle','faClipboardCheck','faArrowRight',
              'faChartPie','faChartBar','faChartArea','faPlusSquare',
              'faPlusCircle','faBan', 'faComment', 'faCog', 'faMagnifyingGlass'],
      regular: ['faImage'],
      brands: ['faFacebookSquare','faLinkedin','faTwitterSquare']
    }
  },
  

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  router: {
    extendRoutes(routes, resolve) {
      const popular = routes.find(route => route.name === 'popular');
      const local = routes.find(route => route.name === 'local');
      const more = routes.find(route => route.name === 'more');
      const article = routes.find(route => route.name === 'article');
      const search = routes.find(route => route.name === 'search');

      if (popular) {
        popular.path = '/popular/:pages';
        popular.component = resolve(__dirname, 'pages/popular.vue');
      }

      if (local) {
        local.path = '/local/:pages';
        local.component = resolve(__dirname, 'pages/local.vue');
      }

      if (more) {
        more.path = '/more/:pages';
        more.component = resolve(__dirname, 'pages/more.vue');
      }

      if (article) {
        article.path = '/:article-:id';
        article.component = resolve(__dirname, 'pages/_article.vue');
      }

      if (search) {
        search.path = '/search/:searchTerms';
        search.component = resolve(__dirname, 'pages/search.vue');
      }
    }
  }

}
