<template>
  <div>
    <h1>{{ $route.params.page }}</h1>
    <nav v-if="pages > 1" class="pagination" role="navigation" aria-label="pagination">
      <a class="pagination-previous">Previous</a>
      <a class="pagination-next">Next page</a>
      <ul class="pagination-list">
        <li>
          <a class="pagination-link" aria-label="Goto page 1">1</a>
        </li>
        <li>
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a class="pagination-link" aria-label="Goto page 45">45</a>
        </li>
        <li>
          <a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
        </li>
        <li>
          <a class="pagination-link" aria-label="Goto page 47">47</a>
        </li>
        <li>
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a class="pagination-link" aria-label="Goto page 86">86</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
  
<script>
import axios from 'axios'

export default {
  name: 'Article',
  data() {
    return {
      postsPerPage: 5,
      pages: 0,
      posts: [],
      paginatedPosts: []
    }
  },
  async created() {
    try {
      const loadingComponent = this.$buefy.loading.open({
        container: null
      })

      await axios.get('http://localhost:1337/api/publicaciones?populate=media&filters[Tipos][$eq]=Destacados')
        .then(response => {
          new Promise((resolve, reject) => {
            this.posts = response.data.data

            // console.log(this.posts)

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

                while (j < this.posts.length && j < this.pages) {
                  this.paginatedPosts.push(this.posts.shift())

                  j++
                }

                i++
              }
            }
            else
              this.paginatedPosts = this.posts

            console.log(this.paginatedPosts)

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
  
<style scoped></style>