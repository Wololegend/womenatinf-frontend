<template>
  <!-- There are four <sections>. Each one of them is a tile that contains: the title, the "popular" section, the "local", and the rest of the posts. -->

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
            <h2 class="title ml-3"> Proyectos destacados </h2>

            <hr class="betweenTitleMain">

            <nuxt-link class="nuxtLinkDecoration" :to="`/${popular[0].attributes.titulo}`">
              <short-post class="ml-3 hoverMain" :img="'http://localhost:1337' + popular[0].attributes.media.data[0].attributes.url"
              :title="popular[0].attributes.titulo" :text="popular[0].attributes.cuerpo"></short-post>
            </nuxt-link>

            <hr class="betweenPostsMain is-centered" v-if="popular.length > 1">

            <short-post class="ml-3 mb-1 hoverMain" v-if="popular.length > 1"
              :img="'http://localhost:1337' + popular[1].attributes.media.data[0].attributes.url"
              :title="popular[1].attributes.titulo" :text="popular[1].attributes.cuerpo"></short-post>
          </div>
        </article>
      </div>
      <div class="tile is-parent">
        <article v-if="boolean && local.length > 0" class="tile is-child notification customMainTile">
          <div class="is-vcentered my-2 container">
            <h2 class="title ml-3"> Proyectos locales </h2>

            <hr class="betweenTitleMain">

            <short-post class="ml-3 hoverMain" :img="'http://localhost:1337' + local[0].attributes.media.data[0].attributes.url"
              :title="local[0].attributes.titulo" :text="local[0].attributes.cuerpo"></short-post>

            <hr class="betweenPostsMain is-centered" v-if="local.length > 1">

            <short-post class="ml-3 mb-1 hoverMain" v-if="local.length > 1"
              :img="'http://localhost:1337' + local[1].attributes.media.data[0].attributes.url"
              :title="local[1].attributes.titulo" :text="local[1].attributes.cuerpo"></short-post>
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-parent">
      <article v-if="boolean && rest.length > 0" class="tile is-child notification customSideTile">
        <div class="content">
          <div class="is-vcentered container mt-3">
            <h2 class="title"> Más iniciativas </h2>

            <hr class="betweenTitleSide">

            <template v-for="(post, index) in this.rest">
              <short-post class="hoverSide ml-1" :img="'http://localhost:1337' + post.attributes.media.data[0].attributes.url"
              :title="post.attributes.titulo" :text="post.attributes.cuerpo" :small="true"></short-post>

              <hr class="betweenPostsSide is-centered" v-if="index < 4">
            </template>

            <!-- <short-post :img="'http://localhost:1337' + rest[0].attributes.media.data[0].attributes.url"
              :title="rest[0].attributes.titulo" :text="rest[0].attributes.cuerpo" :small="true"></short-post>

            <hr class="betweenPostsSide is-centered" v-if="rest.length > 1">

            <short-post v-if="rest.length > 1"
              :img="'http://localhost:1337' + rest[1].attributes.media.data[0].attributes.url"
              :title="rest[1].attributes.titulo" :text="rest[1].attributes.cuerpo" :small="true"></short-post>

            <hr class="betweenPostsSide is-centered" v-if="rest.length > 1">

            <short-post v-if="rest.length > 2"
              :img="'http://localhost:1337' + rest[1].attributes.media.data[0].attributes.url"
              :title="rest[1].attributes.titulo" :text="rest[1].attributes.cuerpo" :small="true"></short-post>

            <hr class="betweenPostsSide is-centered" v-if="rest.length > 1">

            <short-post v-if="rest.length > 3"
              :img="'http://localhost:1337' + rest[1].attributes.media.data[0].attributes.url"
              :title="rest[1].attributes.titulo" :text="rest[1].attributes.cuerpo" :small="true"></short-post> -->
          </div>
        </div>
      </article>
    </div>
  </div>

  <!-- <div class="columns is-multiline is-centered my-5">
    <section class="column is-full titleTileBorder">
      <article class="notification titleTile is-full has-text-centered">
        <h1 class="title is-inline-block" style=""> Nuestros logros más recientes </h1>
      </article>
    </section>

    <section v-if="boolean && popular.length > 0" class="column is-8 customTile mt-3">
      <div class="is-vcentered my-2 container">
        <h2 class="title ml-3"> Destacados </h2>

        <hr class="betweenTitleMain">

        <short-post
          class="ml-3"
          :img="'http://localhost:1337' + popular[0].attributes.media.data[0].attributes.url"
          :title="popular[0].attributes.titulo"
          :text="popular[0].attributes.cuerpo"
        ></short-post>

        <hr 
          class="betweenPostsMain is-centered"
          v-if="popular.length > 1"  
        >

        <short-post
          class="ml-3 mb-1"
          v-if="popular.length > 1"
          :img="'http://localhost:1337' + popular[1].attributes.media.data[0].attributes.url"
          :title="popular[1].attributes.titulo"
          :text="popular[1].attributes.cuerpo"
        ></short-post>
      </div>
    </section>

    <section v-if="boolean && popular.length > 0" class="column is-1  mt-3">
      
    </section>

    <section v-if="boolean && popular.length > 0" class="column is-3 customTile mt-3">
      <div class="is-vcentered my-2 container">
        <h2 class="title ml-3"> Destacados </h2>

        <hr class="betweenTitleMain">

        <short-post
          class="ml-3"
          :img="'http://localhost:1337' + popular[0].attributes.media.data[0].attributes.url"
          :title="popular[0].attributes.titulo"
          :text="popular[0].attributes.cuerpo"
        ></short-post>

        <hr 
          class="betweenPostsMain is-centered"
          v-if="popular.length > 1"  
        >

        <short-post
          class="ml-3 mb-1"
          v-if="popular.length > 1"
          :img="'http://localhost:1337' + popular[1].attributes.media.data[0].attributes.url"
          :title="popular[1].attributes.titulo"
          :text="popular[1].attributes.cuerpo"
        ></short-post>
      </div>
    </section> -->
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

            this.posts.sort((item1, item2) => {
              return item2.attributes.publishedAt - item1.attributes.publishedAt
            })

            // this.popular = this.posts.filter(post => { post.attributes.Tipos == 'Destacados' })

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
  background-color: #f0eff4;
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
  height: 15%
}

.titleTileBorder {
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