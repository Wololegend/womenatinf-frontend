<template>
  <div>
    <div class="tile is-parent is-12 titleTile mt-3 mb-5 is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered"
    :style="windowWidth < 770 ? 'margin-left: 5%; margin-right: 5%' : ''">
      <article class="tile is-child notification " style="background-color:  transparent;">
        <h1 class="title"> Proyectos locales </h1>
      </article>
    </div>

    <div class="tile is-ancestor">
      <div class="control tile is-parent is-8 pb-2" :style="windowWidth < 770 ? 'margin-left: 5%; margin-right: 5%' : ''">
        <input v-model="searchTerms" @keyup.enter="searchPosts(searchTerms)" class="input tile is-child"
          placeholder="Busca aquí por palabras clave o títulos..." type="text"
          style="background-color:#32576e; color: #fff; border-radius: 5px">
      </div>

      <div :class="windowWidth < 770 ? 'tile is-parent is-4 pt-0' : 'tile is-parent is-4'" :style="windowWidth < 770 ? 'margin-left: 5%; margin-right: 5%' : ''">
        <button @click="searchPosts(searchTerms)" class="tile is-child hoverMain"
          style="background-color: #bdd0db; border-width: 0; border-radius: 5px;"
          :style="windowWidth < 770 ? 'background-color: #bdd0db; border-width: 0; border-radius: 5px; width: 100%; height: 2rem' : 'background-color: #bdd0db; border-width: 0; border-radius: 5px; width: 100%'">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="font-size: large;"></font-awesome-icon>
        </button>
      </div>
    </div>

    <div class="body mb-5" :style="windowWidth < 770 ? 'margin-left: 5%; margin-right: 5%' : ''">
      <template v-for="(post, index) in paginatedPosts[$route.params.pages - 1]">
        <nuxt-link style="text-decoration: none; color: #121212" :to="`/${post.attributes.titulo}-${post.id}`">
          <div class="ml-2 mr-5" style="overflow: hidden">
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
          <nuxt-link v-if="$route.params.pages > 1" :to="`/more/${$route.params.pages - 1}`" class="pagination-previous">
            &lt </nuxt-link>
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
      searchTerms: '',
      windowHeight: 0,
      windowWidth: 0,
    }
  },
  async created() {
    try {
      const loadingComponent = this.$buefy.loading.open({
        container: null
      })

      await axios.get(this.process.env.BACKEND_URL + '/api/publicaciones?populate=media&filters[Tipos][$eq]=Locales')
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
    },

    searchPosts(searchTerms) {
      if (searchTerms != '')
        this.$router.push(`/search/${searchTerms}/1`)
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
  background-color: #d4e0e7 !important;
}

.is-current {
  background-color: #32576e
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