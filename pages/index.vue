<template>

  <!-- There are four <sections>. Each one of them is a tile that contains: the title, the "popular" section, the "local", and the rest of the posts. -->

  <div class="tile is-ancestor columns is-multiline my-5 mx-5">

    <!-- TITLE -->
    <section class="tile is-parent is-12">
      <article class="tile is-child notification titleTile is-full has-text-centered">
        <h1 class="title is-inline-block" style=""> Nuestros logros más recientes </h1>
      </article>
    </section>

    <!-- POPULAR -->
    <section class="tile is-parent column is-8 customTile mx-3">
      <div class="columns is-multiline is-vcentered my-2 container">
        <h2 class="title ml-3"> Destacados </h2>

        <hr class="betweenTitle">

        <short-post
          class="ml-3"
          v-if="boolean"
          :img="'http://localhost:1337' + posts[0].attributes.media.data[0].attributes.url"
          :title="posts[0].attributes.titulo"
          :text="posts[0].attributes.cuerpo"
        ></short-post>

        <hr class="betweenPosts is-centered">

        <short-post
          class="ml-3"
          v-if="boolean"
          :img="'http://localhost:1337' + posts[1].attributes.media.data[0].attributes.url"
          :title="posts[1].attributes.titulo"
          :text="posts[1].attributes.cuerpo"
        ></short-post>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import shortPost from '../components/shortPost.vue'

export default {
  name: 'IndexPage',
  components: [shortPost],
  data() {
    return {
      posts: [],
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
            console.log(response.data)

            this.posts = response.data.data

            this.posts.sort((item1, item2) => {
              return item2.attributes.publishedAt - item1.attributes.publishedAt
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
.customTile {
  background-color: #f0eff4;
  color: #121212
}

.titleTile {
  color: #5a869b;
  background-color: #fff;
  border: 3px dashed #5a869b;
}

hr.betweenPosts {
    width: 96%;
    border-color: #32576e;
    background-color: #32576e;
    height: 1px;
    margin: 1rem auto 2rem auto
}

hr.betweenTitle {
    width: 96%;
    border-color: #32576e;
    background-color: #32576e;
    height: 1px;
    margin: 0 auto 2rem auto
}

</style>