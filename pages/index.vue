<template>
  <!-- There are four <sections>. Each one of them is a tile that contains: the title, the "popular" section, the "local", and the rest of the posts. -->

  <div v-if="boolean" class="tile is-ancestor is-flex-wrap-wrap mt-4">
    <div class="tile is-parent is-12" :style="windowWidth < 770 ? 'margin-left: 5%; margin-right: 5%' : ''">
      <article v-if="popular.length > 0"
        class="tile is-child notification is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered titleTile">
        <h1 class="title"> Nuestros logros más recientes </h1>
      </article>
    </div>

    <div class="control tile is-parent is-8">
      <input v-model="searchTerms" @keyup.enter="searchPosts(searchTerms)" class="input tile is-child" placeholder="Busca aquí por palabras clave o títulos..." type="text" style="background-color:#32576e; color: #fff; border-radius: 5px">
    </div>

    <div class="tile is-parent is-4">
      <button @click="searchPosts(searchTerms)" class="tile is-child hoverMain" style="background-color: #bdd0db; border-width: 0; border-radius: 5px;">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="font-size: large;"></font-awesome-icon>
      </button>
    </div>

    <div class="tile is-vertical is-8">
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
      searchTerms: ''
    }
  },
  async created() {
    try {
      const loadingComponent = this.$buefy.loading.open({
        container: null
      })
      await axios.get('http://localhost:1337/api/publicaciones?populate=media')
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
  mounted() {
    window.addEventListener("resize", this.resizeListener)
    this.resizeListener()
  },
  methods: {
    resizeListener() {
      this.windowHeight = window.innerHeight * 0.3;
      this.windowWidth = window.innerWidth;
    },

    searchPosts(searchTerms) {
      if (searchTerms != '')
        this.$router.push(`/search/${searchTerms}`)
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