<template>
  <div v-if="boolean">
    <div class="tile is-parent is-12 my-5 titleTile">
      <article style="background-color: transparent"
        class="tile is-child notification is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
        <h1 class="title" style=""> Proyectos destacados </h1>
      </article>
    </div>

    <div class="body mb-5">
      <template v-for="(post, index) in paginatedPosts[$route.params.pages - 1]">
        <nuxt-link style="text-decoration: none; color: #121212" :to="`/${post.attributes.titulo}-${post.id}`">
          <div class="mx-5" style="overflow: hidden">
            <short-post v-if="index == 0" class="hoverMain mt-5 mb-1" :img="post.attributes.media.data"
              :title="post.attributes.titulo" :text="post.attributes.cuerpo" size="big"></short-post>

            <short-post v-else-if="index < postsPerPage - 1" class="hoverMain mb-2" :img="post.attributes.media.data"
              :title="post.attributes.titulo" :text="post.attributes.cuerpo" size="big"></short-post>

            <short-post v-else class="hoverMain mt-1 mb-5" :img="post.attributes.media.data"
              :title="post.attributes.titulo" :text="post.attributes.cuerpo" size="big"></short-post>
          </div>
        </nuxt-link>

        <hr v-if="index < paginatedPosts[$route.params.pages - 1].length - 1" class="betweenPostsMain is-centered">
      </template>
    </div>

    <nav v-if="pages > 1" class="pagination" role="navigation" aria-label="pagination">
      <ul class="pagination-list is-flex is-justify-content-center">
        <li>
          <nuxt-link v-if="$route.params.pages > 1" :to="`/popular/${$route.params.pages - 1}`" class="pagination-previous">
            < </nuxt-link>
        </li>
        <li v-for="(item, index) in paginatedPosts">
          <nuxt-link v-if="(index + 1) == $route.params.pages" :to="`/popular/${index * 1 + 1}`"
            class="pagination-link is-current" :aria-label="`Goto page ${index * 1 + 1}`"> {{ index + 1 }}
          </nuxt-link>
          <nuxt-link v-else :to="`/popular/${index * 1 + 1}`" class="pagination-link"
            :aria-label="`Goto page ${index * 1 + 1}`"> {{ index + 1 }} </nuxt-link>
        </li>
        <li>
          <nuxt-link v-if="$route.params.pages < pages" :to="`/popular/${$route.params.pages * 1 + 1}`"
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
      boolean: false,
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

      await axios.get('http://localhost:1337/api/publicaciones?populate=media&filters[Tipos][$eq]=Destacados')
        .then(response => {
          new Promise((resolve, reject) => {
            this.posts = response.data.data

            this.posts.sort((item1, item2) => {
              return item2.attributes.publishedAt - item1.attributes.publishedAt
            })

            resolve()
          }).then(() => {
            this.pages = Math.ceil(this.posts.length / this.postsPerPage)

            if (this.pages > 1) {
              this.paginatePosts()
            }
            else
              this.paginatedPosts = [[...this.posts]]

            this.boolean = true

            loadingComponent.close()
          })
        })
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    paginatePosts() {
      var tmpArray = [];

      for (var i = 0; i < this.posts.length; i++) {
        tmpArray.push(this.posts[i]);

        if (tmpArray.length === this.postsPerPage) {
          this.paginatedPosts.push(tmpArray);
          tmpArray = [];
        }
      }

      if (tmpArray.length > 0) {
        this.paginatedPosts.push(tmpArray);
      }
    }
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

.title {
  background-color: transparent
}

.betweenPostsMain {
  width: 96%;
  border-color: #32576e;
  background-color: #32576e;
  height: 1px;
  margin: 1rem auto 2rem auto
}

.body {
  background-color: #bdd0db;
  color: #121212;
  border-radius: 5px;
}

.hoverMain:hover {
  background-color: #d4e0e7;
}

.is-current {
  background-color: #32576e
}
</style>