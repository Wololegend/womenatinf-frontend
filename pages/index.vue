<template>
  <div class="tile is-ancestor is-flex-wrap-wrap mt-4">
    <div class="tile is-parent is-12" style="height: 100%">
      <article v-if="boolean && popular.length > 0"
        class="tile is-child notification is-flex is-flex-direction-column is-justify-content-center is-align-items-center titleTile titleTileBorder">
        <h1 class="title" style=""> Nuestros logros más recientes </h1>
      </article>
    </div>

    <div class="tile is-vertical is-8">
      <div class="tile is-parent">
        <article v-if="boolean && popular.length > 0" class="tile is-child notification customMainTile">
          <div class="is-vcentered my-2 container">
            <nuxt-link class="nuxtLinkDecoration" to="/popular/1">
              <h2 class="title ml-3 mb-5"> Proyectos destacados</h2>
            </nuxt-link>

            <hr class="betweenTitleMain">

            <nuxt-link class="nuxtLinkDecoration" :to="`/${popular[0].attributes.titulo}+${popular[0].id}`">
              <short-post class="ml-3 hoverMain" :img="popular[0].attributes.media.data"
              :title="popular[0].attributes.titulo" :text="popular[0].attributes.cuerpo"></short-post>
            </nuxt-link>

            <hr class="betweenPostsMain is-centered" v-if="popular.length > 1">

            <nuxt-link class="nuxtLinkDecoration" :to="`/${popular[1].attributes.titulo}+${popular[1].id}`">
              <short-post class="ml-3 mb-1 hoverMain" v-if="popular.length > 1"
                :img="popular[1].attributes.media.data"
                :title="popular[1].attributes.titulo" :text="popular[1].attributes.cuerpo"></short-post>
            </nuxt-link>
          </div>
        </article>
      </div>
      <div class="tile is-parent">
        <article v-if="boolean && local.length > 0" class="tile is-child notification customMainTile">
          <div class="is-vcentered my-2 container">
            <nuxt-link class="nuxtLinkDecoration" to="/local">
              <h2 class="title ml-3 mb-5"> Proyectos locales </h2>
            </nuxt-link>

            <hr class="betweenTitleMain">

            <nuxt-link class="nuxtLinkDecoration" :to="`/${local[0].attributes.titulo}+${local[0].id}`">
              <short-post class="ml-3 hoverMain" :img="local[0].attributes.media.data"
                :title="local[0].attributes.titulo" :text="local[0].attributes.cuerpo"></short-post>
            </nuxt-link>

            <hr class="betweenPostsMain is-centered" v-if="local.length > 1">

            <nuxt-link class="nuxtLinkDecoration" :to="`/${local[1].attributes.titulo}+${local[1].id}`">
              <short-post class="ml-3 mb-1 hoverMain" v-if="local.length > 1"
                :img="local[1].attributes.media.data"
                :title="local[1].attributes.titulo" :text="local[1].attributes.cuerpo"></short-post>
            </nuxt-link>
            
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-parent">
      <article v-if="boolean && rest.length > 0" class="tile is-child notification customSideTile">
        <div class="content">
          <div class="is-vcentered container mt-3">
            <nuxt-link class="nuxtLinkDecoration" to="/more/1">
              <h2 class="title titleSideHover ml-3 mb-5"> Más iniciativas </h2>
            </nuxt-link>

            <hr class="betweenTitleSide">

            <template v-for="(post, index) in this.rest">
              <nuxt-link class="nuxtLinkDecoration" :to="`/${post.attributes.titulo}+${post.id}`">
                <short-post class="hoverSide ml-1" :img="post.attributes.media.data"
                  :title="post.attributes.titulo" :text="post.attributes.cuerpo" :small="true"></short-post>
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

export default {
  name: 'IndexPage',
  components: [shortPost],
  data() {
    return {
      posts: [],
      popular: [],
      local: [],
      rest: [],
      boolean: false
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

            console.log(this.posts)

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

                console.log(this.rest)
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

  }
}
</script>

<style scoped>
.customMainTile {
  background-color: #bdd0db;
  border-radius: 5px;
  height: 7rem
}

.betweenPostsMain {
  width: 96%;
  border-color: #32576e;
  background-color: #32576e;
  height: 1px;
  margin: 1rem auto 2rem auto
}

.betweenTitleMain {
  width: 96%;
  border-color: #32576e;
  background-color: #32576e;
  height: 2px;
  margin: 0 auto 2rem auto
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
  background-color: #d1d1d3;
}

.hoverSide:hover {
  background-color: #336381;
}

.nuxtLinkDecoration {
  text-decoration: none !important;
}
</style>