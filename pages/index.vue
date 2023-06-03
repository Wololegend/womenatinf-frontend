<template>
  <div class="tile is-ancestor columns is-multiline my-5 mx-5">
    <div class="tile is-parent is-12">
      <article class="tile is-child notification titleTile is-full has-text-centered">
        <h1 class="title is-inline-block my-0" style="  font-size: 35px !important;"> Nuestros logros más recientes </h1>
      </article>
    </div>

    <div class="tile is-parent column is-8 customTile mx-3">
      <div class="columns is-multiline is-vcentered ml-3 my-2">
        <short-post
          class="column is-12"
          v-for="(post, index) in posts"
          :key="index"
          v-if="boolean && index < 2"
          :img="'http://localhost:1337' + post.attributes.media.data[0].attributes.url"
          :title="post.attributes.titulo"
          :text="post.attributes.cuerpo"
        ></short-post>
      </div>
    </div>
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
  background-color: #32576e
}

.titleTile {
  color: #5a869b;
  background-color: #fff;
  border: 3px dashed #5a869b;
}
</style>