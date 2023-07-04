<template>
  <!-- There are four <sections>. Each one of them is a tile that contains: the title, the "popular" section, the "local", and the rest of the posts. -->

  <div v-if="boolean" class="tile is-ancestor is-flex-wrap-wrap mt-4">
    <div class="tile is-parent is-12" :style="windowWidth < 770 ? 'margin-left: 5%; margin-right: 5%' : ''">
      <article v-if="popular.length > 0"
        class="tile is-child notification is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered titleTile">
        <h1 class="title"> Nuestros logros más recientes </h1>
      </article>
    </div>

    <div class="control tile is-parent is-8 pb-2" :style="windowWidth < 770 ? 'margin-left: 5%; margin-right: 5%' : ''">
      <input v-model="searchTerms" @keyup.enter="searchPosts(searchTerms)" class="input tile is-child"
        placeholder="Busca aquí por palabras clave o títulos..." type="text"
        style="background-color:#32576e; color: #fff; border-radius: 5px">
    </div>

    <div :class="windowWidth < 770 ? 'tile is-parent is-4 pt-0' : 'tile is-parent is-4'"
      :style="windowWidth < 770 ? 'margin-left: 5%; margin-right: 5%' : ''">
      <button @click="searchPosts(searchTerms)" class="tile is-child hoverMain"
        :style="windowWidth < 770 ? 'background-color: #bdd0db; border-width: 0; border-radius: 5px; width: 100%; height: 2rem' : 'background-color: #bdd0db; border-width: 0; border-radius: 5px; width: 100%'">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="font-size: large;"></font-awesome-icon>
      </button>
    </div>

    <div class="tile is-vertical is-8" :style="windowWidth < 770 ? 'margin-left: 5%; margin-right: 5%' : ''">
      <div class="tile is-parent">
        <article v-if="popular.length > 0" class="tile is-child notification customMainTile">
          <div
            :class="windowWidth < 770 ? 'is-vcentered my-2 container has-text-centered' : 'is-vcentered my-2 container'">
            <nuxt-link to="/popular/1" style="text-decoration: none">
              <h2 class="title mb-5"> Proyectos destacados </h2>
            </nuxt-link>

            <hr :style="windowWidth < 770 ? 'margin: 0 auto 2rem 2%' : 'margin: 0 auto 2rem auto'"
              class="betweenTitleMain">

            <nuxt-link class="nuxtLinkDecoration" :to="`/${popular[0].url}`">
              <short-post :class="windowWidth < 770 ? 'hoverMain' : 'ml-3 hoverMain'"
                :img="popular[0].attributes.media.data" :title="popular[0].attributes.titulo"
                :text="popular[0].attributes.cuerpo"></short-post>
            </nuxt-link>

            <hr :style="windowWidth < 770 ? 'margin: 1rem auto 2rem 2%' : 'margin: 1rem auto 2rem auto'"
              class="betweenPostsMain is-centered" v-if="popular.length > 1">

            <nuxt-link class="nuxtLinkDecoration" :to="`/${popular[1].url}`">
              <short-post :class="windowWidth < 770 ? 'hoverMain' : 'ml-3 mb-1 hoverMain'" v-if="popular.length > 1"
                :img="popular[1].attributes.media.data" :title="popular[1].attributes.titulo"
                :text="popular[1].attributes.cuerpo"></short-post>
            </nuxt-link>
          </div>
        </article>
      </div>

      <div v-if="windowWidth < 770" class="tile is-parent">
        <article v-if="rest.length > 0" class="tile is-child notification customSideTile">
          <div class="content">
            <div class="is-vcentered mt-3 container has-text-centered">
              <nuxt-link to="/more/1" style="text-decoration: none">
                <h2 class="title mb-5"> Más iniciativas </h2>
              </nuxt-link>

              <hr class="betweenTitleSide">

              <div class="tile is-ancestor">
                <nuxt-link class="nuxtLinkDecoration tile is-parent" :to="`/${rest[0].url}`">
                  <short-post class="ml-1 hoverMain tile is-child is-3" :img="rest[0].attributes.media.data"
                    :title="rest[0].attributes.titulo" :text="rest[0].attributes.cuerpo" size="small"></short-post>
                </nuxt-link>

                <nuxt-link class="nuxtLinkDecoration tile is-parent" :to="`/${rest[1].url}`">
                  <short-post class="ml-1 hoverMain tile is-child is-3" :img="rest[1].attributes.media.data"
                    :title="rest[1].attributes.titulo" :text="rest[1].attributes.cuerpo" size="small"></short-post>
                </nuxt-link>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="tile is-parent">
        <article v-if="local.length > 0" class="tile is-child notification customMainTile">
          <div
            :class="windowWidth < 770 ? 'is-vcentered my-2 container has-text-centered' : 'is-vcentered my-2 container'">
            <nuxt-link to="/local/1" style="text-decoration: none">
              <h2 class="title mb-5"> Proyectos locales </h2>
            </nuxt-link>

            <hr :style="windowWidth < 770 ? 'margin: 0 auto 2rem 2%' : 'margin: 0 auto 2rem auto'"
              class="betweenTitleMain">

            <nuxt-link class="nuxtLinkDecoration" :to="`/${local[0].url}`">
              <short-post :class="windowWidth < 770 ? 'hoverMain' : 'ml-3 hoverMain'"
                :img="local[0].attributes.media.data" :title="local[0].attributes.titulo"
                :text="local[0].attributes.cuerpo"></short-post>
            </nuxt-link>

            <hr :style="windowWidth < 770 ? 'margin: 1rem auto 2rem 2%' : 'margin: 1rem auto 2rem auto'"
              class="betweenPostsMain is-centered" v-if="popular.length > 1">

            <nuxt-link class="nuxtLinkDecoration" :to="`/${local[1].url}`">
              <short-post :class="windowWidth < 770 ? 'hoverMain' : 'ml-3 mb-1 hoverMain'" v-if="local.length > 1"
                :img="local[1].attributes.media.data" :title="local[1].attributes.titulo"
                :text="local[1].attributes.cuerpo"></short-post>
            </nuxt-link>

          </div>
        </article>
      </div>
    </div>
    <div v-if="windowWidth >= 770" class="tile is-parent">
      <article v-if="rest.length > 0" class="tile is-child notification customSideTile">
        <div class="content">
          <div class="is-vcentered mt-3 container">
            <nuxt-link to="/more/1" style="text-decoration: none">
              <h2 class="title mb-5"> Más iniciativas </h2>
            </nuxt-link>

            <hr class="betweenTitleSide">

            <template v-for="(post, index) in this.rest">
              <nuxt-link class="nuxtLinkDecoration" :to="`/${post.url}`">
                <short-post class="ml-1 hoverMain" :img="post.attributes.media.data" :title="post.attributes.titulo"
                  :text="post.attributes.cuerpo" size="small"></short-post>
              </nuxt-link>

              <hr class="betweenPostsSide is-centered" v-if="index < 4">
            </template>
          </div>
        </div>
      </article>
    </div>
  </div>
</div></template>

<script>
import axios from 'axios'

import shortPost from '../components/shortPost.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'IndexPage',
  components: [shortPost],
  data() {
    return {
      posts: [],
      popular: [],
      local: [],
      rest: [],
      boolean: false,
      windowHeight: 0,
      windowWidth: 0,
      searchTerms: '',
      keyWordsES: [
        "proyectos informáticos de mujeres",
        "iniciativas informáticas de mujeres",
        "mujeres en la informática",
        "mujeres en la tecnología",
        "inspiración para mujeres en la informática",
        "mujeres emprendedoras tecnológicas",
        "desarrollo de software por mujeres",
        "programadoras destacadas",
        "ingenieras informáticas",
        "mujeres y tecnología",
        "mujeres en STEM",
        "mujeres en la programación",
        "referentes femeninos en la informática",
        "proyectos innovadores de mujeres",
        "mujeres en la industria tecnológica",
        "historias de éxito de mujeres en la informática",
        "mujeres en la inteligencia artificial",
        "mujeres en el desarrollo web",
        "mujeres en la ciberseguridad",
        "iniciativas de inclusión en la informática",
        "mujeres en la computación",
        "mujeres en la ciencia de datos",
        "mujeres en la robótica",
        "mujeres en la realidad virtual",
        "mujeres en la educación tecnológica",
        "mujeres en el diseño de UX/UI",
        "conferencias de tecnología para mujeres",
        "comunidad de mujeres en la informática",
        "oportunidades laborales para mujeres en tecnología",
        "blog de mujeres en la informática",
        "mujeres en la programación móvil",
        "cursos de tecnología para mujeres",
        "mujeres en la ingeniería de software",
        "mujeres en el análisis de datos",
        "mujeres en la computación en la nube",
        "startups tecnológicas fundadas por mujeres",
        "mujeres en la inteligencia de negocios",
        "mujeres en la realidad aumentada",
        "mujeres en la bioinformática",
        "proyectos open source desarrollados por mujeres",
        "mujeres en la impresión 3D",
        "mujeres en el internet de las cosas",
        "redes sociales para mujeres en tecnología",
        "mujeres en la ingeniería de sistemas",
        "mujeres en la inteligencia computacional",
        "mujeres en la informática médica",
        "mujeres en la seguridad informática",
        "mujeres en la ingeniería de redes",
        "mujeres en la programación orientada a objetos",
        "mujeres en la realidad virtual",
        "conferencias sobre tecnología y género",
        "mujeres en la inteligencia artificial ética",
        "mujeres en la informática forense",
        "mujeres en el análisis de big data",
        "mujeres en la ingeniería de sistemas de información",
        "mujeres en la informática educativa",
        "mujeres en la programación funcional",
        "mujeres en la inteligencia artificial en la salud",
        "mujeres en la ingeniería de sistemas de seguridad",
        "mujeres en la programación web",
        "mujeres en la inteligencia artificial en los negocios",
        "mujeres en la informática móvil y ubicua",
        "mujeres en la ingeniería de sistemas de comunicaciones",
        "mujeres en la inteligencia artificial en la logística",
        "mujeres en la informática afectiva",
        "mujeres en la programación reactiva",
        "mujeres en la ingeniería de sistemas de producción",
        "mujeres en la robótica asistencial",
        "mujeres en la inteligencia artificial en el comercio",
        "mujeres en la informática creativa"
      ],
      keyWordsEN: [
        "women in computer projects",
        "women in IT initiatives",
        "women in computing",
        "women in technology",
        "inspiration for women in computer science",
        "women tech entrepreneurs",
        "software development by women",
        "prominent female programmers",
        "women computer engineers",
        "women and technology",
        "women in STEM",
        "women in programming",
        "female role models in computing",
        "innovative projects by women",
        "women in the tech industry",
        "success stories of women in computing",
        "women in artificial intelligence",
        "women in web development",
        "women in cybersecurity",
        "inclusion initiatives in computing",
        "women in computer science",
        "women in data science",
        "women in robotics",
        "women in virtual reality",
        "women in tech education",
        "women in UX/UI design",
        "technology conferences for women",
        "women's tech community",
        "job opportunities for women in technology",
        "blog by women in computing",
        "women in mobile programming",
        "technology courses for women",
        "women in software engineering",
        "women in data analysis",
        "women in cloud computing",
        "tech startups founded by women",
        "women in business intelligence",
        "women in augmented reality",
        "women in bioinformatics",
        "open-source projects developed by women",
        "women in 3D printing",
        "women in the Internet of Things",
        "social networks for women in tech",
        "women in systems engineering",
        "women in computational intelligence",
        "women in medical informatics",
        "women in cybersecurity",
        "women in network engineering",
        "women in object-oriented programming",
        "women in virtual reality",
        "conferences on technology and gender",
        "women in ethical artificial intelligence",
        "women in forensic computing",
        "women in big data analysis",
        "women in information systems engineering",
        "women in educational computing",
        "women in functional programming",
        "women in AI in healthcare",
        "women in systems security engineering",
        "women in web programming",
        "women in AI for business",
        "women in mobile and ubiquitous computing",
        "women in communication systems engineering",
        "women in AI for logistics",
        "women in affective computing",
        "women in reactive programming",
        "women in production systems engineering",
        "women in assistive robotics",
        "women in AI for commerce",
        "women in creative computing"
      ],
      scoreArrayES: [
        "proyectos", "informáticos", "mujeres", "informática", "iniciativas",
        "inspiración", "estudios", "comenzar", "continuar", "desarrollados",
        "total", "parcialmente", "emprendedoras", "destacadas", "ingenieras",
        "tecnología", "programación", "referentes", "femeninas", "innovadoras",
        "industria", "historias", "éxito", "inteligencia", "artificial",
        "desarrollo", "web", "ciberseguridad", "inclusión", "computación",
        "ciencia", "datos", "robótica", "realidad", "virtual", "educación",
        "diseño", "conferencias", "oportunidades", "laborales", "blog",
        "móvil", "cursos", "análisis", "cloud", "startups", "impresión",
        "redes", "sociales", "sistemas", "computacionales", "seguridad",
        "objetos", "ética", "forense", "logística", "sistemas", "información",
        "educativa", "funcional",
      ],
      scoreArrayEN: [
        "women", "computer", "projects", "it", "initiatives",
        "computing", "technology", "inspiration", "studies", "start",
        "continue", "developed", "total", "partially", "world",
        "entrepreneurs", "prominent", "engineers", "stem", "programming",
        "role", "models", "innovative", "industry", "success",
        "stories", "artificial", "intelligence", "development", "web",
        "cybersecurity", "inclusion", "computing", "data", "science",
        "robotics", "virtual", "reality", "education", "design",
        "conferences", "job", "opportunities", "blog", "mobile",
        "courses", "analysis", "cloud", "startups", "printing",
        "networks", "social", "systems", "computational", "security",
        "oriented", "objects", "ethics", "forensic", "logistics",
        "information", "educational", "functional",
      ],
      GIITopCountries: ['Switzerland', 'United States', 'Sweden', 'United Kingdom', 'Netherlands'],
      googleSearchResults: []
    }
  },
  async mounted() {
    window.addEventListener("resize", this.resizeListener)
    this.resizeListener()

    this.searchAlgorithm()

    try {
      const loadingComponent = this.$buefy.loading.open({
        container: null
      })
      await axios.get('https://pristine-biscayne-20430-612b2c9251a8.herokuapp.com/api/publicaciones?populate=media')
        .then(response => {
          new Promise((resolve, reject) => {
            this.posts = response.data.data

            this.posts.forEach(post => {
              post.url = post.attributes.titulo.replace(new RegExp(" ", "g"), "+")

              post.url += "-" + post.id
            })

            this.posts.sort((item1, item2) => {
              return item2.attributes.publishedAt - item1.attributes.publishedAt
            })

            this.posts.forEach(post => {
              if (post.attributes.Tipos == 'Destacados')
                this.popular.push(post)
              else if (post.attributes.Tipos == 'Locales')
                this.local.push(post)
              else
                this.rest.push(post)
            })

            resolve()
          }).then(() => {
            this.boolean = true

            loadingComponent.close()
          })
        })
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async searchAlgorithm() {
      let updatedDateTime = new Date()
      let serverDateTime = new Date()

      try {
        await axios.get('http://worldtimeapi.org/api/timezone/Europe/London'
        ).then((response) => {
          updatedDateTime = response.data.datetime
        })
      }
      catch (error) {
        console.log(error)
      }

      try {
        await axios.get('https://pristine-biscayne-20430-612b2c9251a8.herokuapp.com/api/fecha-hora-algoritmo',
        ).then((response) => {
          serverDateTime = response.data.data.attributes.fechaHora
        })
      }
      catch (error) {
        console.log(error)
      }

      const updatedDateTimeFormated = new Date(updatedDateTime)
      let serverDateTimeFormated = new Date(serverDateTime)

      if (((updatedDateTimeFormated - serverDateTimeFormated) / 3600000) > 24) {
        let random = Math.floor(Math.random() * this.keyWordsES.length)
        let promiseArray = []

        promiseArray.push(this.searchGoogleByKeyword(this.keyWordsES[random], "Spain", "news"))
        promiseArray.push(this.searchGoogleByKeyword(this.keyWordsES[random], "Spain", "scholar"))
        promiseArray.push(this.searchGoogleByKeyword(this.keyWordsES[random], "Spain", "web"))
        promiseArray.push(this.searchGoogleByKeyword(this.keyWordsEN[random], this.GIITopCountries[random % this.GIITopCountries.length], "news"))
        promiseArray.push(this.searchGoogleByKeyword(this.keyWordsEN[random], this.GIITopCountries[random % this.GIITopCountries.length], "scholar"))
        promiseArray.push(this.searchGoogleByKeyword(this.keyWordsEN[random], this.GIITopCountries[random % this.GIITopCountries.length], "web"))

        Promise.all(promiseArray).then(() => {
          this.scoreGoogleSearches()

          this.googleSearchResults.forEach((search) => {
            try {
              if ('snippet' in search) {
                axios.post('https://pristine-biscayne-20430-612b2c9251a8.herokuapp.com/api/algoritmo-busquedas',
                  {
                    'data': {
                      'Titulo': search.title,
                      'Fragmento': search.snippet,
                      'Enlace': search.link,
                      'Puntuacion': search.score,
                      'Origen': 'Google ' + search.type,
                      'LocalizacionBusqueda': search.location,
                      'PalabrasClave': search.keywords
                    }
                  })
              }
            }
            catch (error) {
              console.log(error)
            }
          })
        })

        try {
          await axios.put('https://pristine-biscayne-20430-612b2c9251a8.herokuapp.com/api/fecha-hora-algoritmo',
            {
              'data': {
                'fechaHora': updatedDateTime
              }
            }
          )
        }
        catch (error) {
          console.log(error)
        }
      }
    },

    searchGoogleByKeyword(keywords, location, type) {
      return new Promise((resolve, reject) => {
        try {
          let params = {
            api_key: process.env.API_KEY,
            q: keywords,
            location: location
          }

          if (type != "web")
            params.search_type = type

          axios.get('https://api.scaleserp.com/search', { params }
          ).then((response) => {
            console.log(keywords, location, type, response)

            if (type == 'news')
              response.data.news_results.forEach((result, index) => {
                this.googleSearchResults.push({
                  type: type,
                  location: location,
                  keywords: keywords,
                  title: result.title.toLowerCase(),
                  link: result.link,
                  position: result.position / response.data.news_results.length,
                  score: 0
                })

                if ('snippet' in result)
                  this.googleSearchResults[index].snippet = result.snippet.toLowerCase()
              })
            else if (type == 'scholar')
              response.data.scholar_results.forEach((result, index) => {
                this.googleSearchResults.push({
                  type: type,
                  location: location,
                  keywords: keywords,
                  title: result.title.toLowerCase(),
                  link: result.link,
                  position: result.position / response.data.scholar_results.length,
                  score: 0
                })

                if ('snippet' in result)
                  this.googleSearchResults[index].snippet = result.snippet.toLowerCase()
              })
            else
              response.data.organic_results.forEach((result, index) => {
                this.googleSearchResults.push({
                  type: type,
                  location: location,
                  keywords: keywords,
                  title: result.title.toLowerCase(),
                  link: result.link,
                  position: result.position / response.data.organic_results.length,
                  score: 0
                })

                if ('snippet' in result)
                  this.googleSearchResults[index].snippet = result.snippet.toLowerCase()
              })

            resolve()
          })
        } catch (e) {
          console.error('Error al realizar la búsqueda en Google:', e);

          reject()
        }
      })
    },

    scoreGoogleSearches() {
      let arrayTmp = []

      this.googleSearchResults.forEach((search) => {
        const titleArray = search.title.split(/[\s.,;@#~¬]+/)
        let snippetArray = []

        if ('snippet' in search)
          snippetArray = search.snippet.split(/[\s.,;@#~¬]+/)

        this.scoreArrayES.forEach(keyWord => {
          if (titleArray.includes(keyWord))
            search.score += 100

          if (snippetArray.includes(keyWord))
            search.score += 50
        })

        search.score += search.position * 100

        if (location == "Spain")
          search.score += 500

        if (search.score > 100)
        arrayTmp.push(search)
      })

    this.googleSearchResults = arrayTmp

    this.googleSearchResults.sort(function (a, b) {
      return b.score - a.score
    })
  },

  resizeListener() {
    this.windowHeight = window.innerHeight * 0.3;
    this.windowWidth = window.innerWidth;
  },

  searchPosts(searchTerms) {
    if (searchTerms != '')
      this.$router.push(`/search/${searchTerms}/1`)
  }
}
}
</script>

<style scoped>
.customMainTile {
  background-color: #bdd0db;
  color: #121212;
  border-radius: 5px;
}

.customSideTile {
  background-color: #32576e;
  color: #fff;
  border-radius: 5px;
}

.titleTile {
  color: #32576e;
  background-color: #fff;
  border: 3px dashed #32576e;
  border-radius: 5px;
  height: 7rem
}

.betweenPostsMain {
  width: 100%;
  border-color: #32576e;
  background-color: #32576e;
  height: 1px;
}

.betweenTitleMain {
  width: 100%;
  border-color: #32576e;
  background-color: #32576e;
  height: 2px;
}

.betweenPostsSide {
  width: 96%;
  border-color: #f0eff4;
  background-color: #f0eff4;
  height: 1px;
  margin: 1rem auto 2rem auto
}

.betweenTitleSide {
  width: 96%;
  border-color: #f0eff4;
  background-color: #f0eff4;
  height: 2px;
  margin: 0 auto 2rem auto
}

.hoverMain:hover {
  background-color: #d4e0e7 !important;
}

.hoverSide:hover {
  background-color: #336381;
}

button {
  cursor: pointer !important
}

.nuxtLinkDecoration {
  text-decoration: none !important;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #c7c4d1;
  opacity: 1;
  /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #fff;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #fff;
}
</style>