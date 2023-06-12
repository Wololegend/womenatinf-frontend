<template>
  <div>
    <div class="tile is-parent is-12" style="height: 100%">
      <article v-if="boolean"
        class="tile is-child notification is-flex is-flex-direction-column is-justify-content-center is-align-items-center titleTile">
        <h1 class="title" style=""> Todas las iniciativas </h1>
      </article>
    </div>
    
    <div class="body">

    </div>

    <nav v-if="pages > 1" class="pagination" role="navigation" aria-label="pagination">
      <ul class="pagination-list is-flex is-justify-content-center">
        <li>
          <nuxt-link v-if="$route.params.pages > 1" :to="`/more/${$route.params.pages - 1}`" class="pagination-previous">
            < </nuxt-link>
        </li>
        <li v-for="(item, index) in paginatedPosts">
          <nuxt-link v-if="(index + 1) == $route.params.pages" :to="`/more/${index * 1 + 1}`"
            class="pagination-link is-current" :aria-label="`Goto page ${index * 1 + 1}`"> {{ index + 1 }}
          </nuxt-link>
          <nuxt-link v-else :to="`/more/${index * 1 + 1}`" class="pagination-link"
            :aria-label="`Goto page ${index * 1 + 1}`"> {{ index + 1 }} </nuxt-link>
        </li>
        <li>
          <nuxt-link v-if="$route.params.pages < pages" :to="`/more/${$route.params.pages * 1 + 1}`"
            class="pagination-next"> > </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
    
<script>
import axios from 'axios'
import shortPost from '../components/shortPost.vue'

export default {
  name: 'Article',
  data() {
    return {
      postsPerPage: 3,
      pages: 0,
      posts: [],
      paginatedPosts: [],
    }
  },
  async created() {
    try {
      const loadingComponent = this.$buefy.loading.open({
        container: null
      })

      await axios.get('http://localhost:1337/api/publicaciones?populate=media&filters[Tipos][$eq]=NoDestacados')
        .then(response => {
          new Promise((resolve, reject) => {
            this.posts = response.data.data

            //   console.log(this.posts)

            this.posts.sort((item1, item2) => {
              return item2.attributes.publishedAt - item1.attributes.publishedAt
            })

            resolve()
          }).then(() => {
            this.pages = Math.ceil(this.posts.length / this.postsPerPage)

            if (this.pages > 1) {
              // this.paginatedPosts.push(this.posts.shift())

              let i = 0

              while (i < this.posts.length) {
                let j = 0
                let tmpArray = []

                while (j < this.posts.length && j < this.pages) {
                  tmpArray.push(this.posts.shift())

                  j++
                }

                this.paginatedPosts.push(tmpArray)

                i++
              }
            }
            else
              this.paginatedPosts = this.posts

            //   console.log(this.paginatedPosts)

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
.titleTile {
  color: #32576e;
  background-color: #fff;
  border: 3px dashed #32576e;
  border-radius: 5px;
  height: 7rem
}
</style>