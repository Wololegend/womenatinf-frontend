<template>
  <!-- There are four <sections>. Each one of them is a tile that contains: the title, the "popular" section, the "local", and the rest of the posts. -->

  <div class="tile is-ancestor is-flex-wrap-wrap mt-4">
    <div class="tile is-parent is-12">
      <article v-if="boolean && popular.length > 0"
        class="tile is-child notification is-flex is-flex-direction-column is-justify-content-center is-align-items-center titleTile">
        <h1 class="title" style=""> Nuestros logros más recientes </h1>
      </article>
    </div>

    <div class="tile is-vertical is-8">
      <div class="tile is-parent">
        <article v-if="boolean && popular.length > 0" class="tile is-child notification customMainTile">
          <div class="is-vcentered my-2 container">
            <nuxt-link to="/popular/1" style="text-decoration: none">
              <h2 class="title mb-5"> Proyectos destacados </h2>
            </nuxt-link>

            <hr class="betweenTitleMain">

            <nuxt-link class="nuxtLinkDecoration" :to="`/${popular[0].url}`">
              <short-post class="ml-3 hoverMain" :img="popular[0].attributes.media.data"
              :title="popular[0].attributes.titulo" :text="popular[0].attributes.cuerpo"></short-post>
            </nuxt-link>

            <hr class="betweenPostsMain is-centered" v-if="popular.length > 1">

            <nuxt-link class="nuxtLinkDecoration" :to="`/${popular[1].url}`">
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
            <nuxt-link to="/local/1" style="text-decoration: none">
              <h2 class="title mb-5"> Proyectos locales </h2>
            </nuxt-link>

            <hr class="betweenTitleMain">

            <nuxt-link class="nuxtLinkDecoration" :to="`/${local[0].url}`">
              <short-post class="ml-3 hoverMain" :img="local[0].attributes.media.data"
                :title="local[0].attributes.titulo" :text="local[0].attributes.cuerpo"></short-post>
            </nuxt-link>

            <hr class="betweenPostsMain is-centered" v-if="local.length > 1">

            <nuxt-link class="nuxtLinkDecoration" :to="`/${local[1].url}`">
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
            <nuxt-link to="/more/1" style="text-decoration: none">
              <h2 class="title mb-5"> Más iniciativas </h2>
            </nuxt-link>

            <hr class="betweenTitleSide">

            <template v-for="(post, index) in this.rest">
              <nuxt-link class="nuxtLinkDecoration" :to="`/${post.url}`">
                <short-post class="hoverSide ml-1" :img="post.attributes.media.data"
                  :title="post.attributes.titulo" :text="post.attributes.cuerpo" size="small"></short-post>
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
            // this.posts.forEach(post => {
            //   switch (post.attributes.Tipos) {
            //     case "Destacados":
            //       this.popular.push(post)
            //     break;

            //     case "Locales":
            //       this.local.push(post)
            //     break;

            //     case "No destacados":
            //       this.rest.push(post)
            //     break;
            //   }
            // })         

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
  width: 96%;
  border-color: #32576e;
  background-color: #32576e;
  height: 1px;
  margin: 1rem auto 2rem auto
}

.betweenTitleMain {
  width: 100%;
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
  background-color: #d4e0e7;
}

.hoverSide:hover {
  background-color: #336381;
}

.nuxtLinkDecoration {
  text-decoration: none !important;
}
</style>