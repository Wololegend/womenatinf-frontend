<template>
  <div v-if="boolean">    
    <div class="tile is-parent is-12 titleTile mt-3 mb-5 is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered"
    :style="windowWidth < 770 ? 'margin-left: 5%; margin-right: 5%' : ''">
      <article class="tile is-child notification " style="background-color:  transparent;">
        <h1 class="title"> Búsqueda </h1>
      </article>
    </div>



    <div class="tile is-ancestor">
      <div class="control tile is-parent is-8 pb-2" :style="windowWidth < 770 ? 'margin-left: 5%; margin-right: 5%' : ''">
        <input v-model="searchBarTerms" @keyup.enter="searchPosts(searchBarTerms)" class="input tile is-child"
          placeholder="Busca aquí por palabras clave o títulos..." type="text"
          style="background-color:#32576e; color: #fff; border-radius: 5px">
      </div>

      <div :class="windowWidth < 770 ? 'tile is-parent is-4 pt-0' : 'tile is-parent is-4'" :style="windowWidth < 770 ? 'margin-left: 5%; margin-right: 5%' : ''">
        <button @click="searchPosts(searchBarTerms)" class="tile is-child hoverMain"
          style="background-color: #bdd0db; border-width: 0; border-radius: 5px;"
          :style="windowWidth < 770 ? 'background-color: #bdd0db; border-width: 0; border-radius: 5px; width: 100%; height: 2rem' : 'background-color: #bdd0db; border-width: 0; border-radius: 5px; width: 100%; height: 2.5rem'">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="font-size: large;"></font-awesome-icon>
        </button>
      </div>
    </div>

    <div class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered">
      <h1 class="subtitle" v-if="allPosts.length == 0"> Lo sentimos, no hemos encontrado ningún artículo relacionado con tu búsqueda. </h1>
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
          <nuxt-link v-if="$route.params.pages > 1" :to="`/search/${$route.params.searchTerms}/${$route.params.pages - 1}`"
            class="pagination-previous">
            &lt </nuxt-link>
        </li>
        <li v-for="(item, index) in paginatedPosts">
          <nuxt-link v-if="(index + 1) == $route.params.pages" :to="`/search/${$route.params.searchTerms}/${index * 1 + 1}`"
            class="pagination-link is-current" :aria-label="`Goto page ${index * 1 + 1}`"> {{ index + 1 }}
          </nuxt-link>
          <nuxt-link v-else :to="`/search/${$route.params.searchTerms}/${index * 1 + 1}`" class="pagination-link"
            :aria-label="`Goto page ${index * 1 + 1}`"> {{ index + 1 }} </nuxt-link>
        </li>
        <li>
          <nuxt-link v-if="$route.params.pages < pages" :to="`/search/${$route.params.searchTerms}/${$route.params.pages * 1 + 1}`"
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
      allPosts: [],
      paginatedPosts: [],
      searchTerms: [],
      searchBarTerms: '',
      windowHeight: 0,
      windowWidth: 0,
    }
  },
  created() {
    this.searchBarTerms = this.$route.params.searchTerms    
  },
  mounted() {
    window.addEventListener("resize", this.resizeListener)
    this.resizeListener()

    try {
      const loadingComponent = this.$buefy.loading.open({
        container: null
      })
      
      let searchTermsTmp = this.$route.params.searchTerms.split(" ")

      searchTermsTmp.forEach(term => {
        this.searchTerms.push(term.replace(/[^\w\s]|/g, "").toLowerCase())
      })

      let arrayPromises = []
      let titlePosts = []
      let bodyPosts = []
      let keyWordsPosts = []

      arrayPromises.push(new Promise((resolve, reject) => {
        axios.get('http://localhost:1337/api/publicaciones?populate=media')
          .then(response => {
            this.allPosts = response.data.data

            this.allPosts.forEach(post => {
              let tags = []
              let title = []
              let tagsTmp = ''

              tagsTmp = post.attributes.etiquetas.replace(/\s/g, "").toLowerCase()

              title = post.attributes.titulo.toLowerCase().split(" ")
              tags = tagsTmp.split(/,/)

              keyWordsPosts.push({
                id: post.id,
                tags: tags,
                title: title
              })
            })

            resolve()
          })
      }))

      arrayPromises.push(new Promise((resolve, reject) => {
        axios.get('http://localhost:1337/api/publicaciones?populate=media&filters[titulo][$contains]=' + this.$route.params.searchTerms)
          .then(responseTitle => {
            titlePosts = responseTitle.data.data

            resolve()
          })
      }))

      arrayPromises.push(new Promise((resolve, reject) => {
        axios.get('http://localhost:1337/api/publicaciones?populate=media&filters[cuerpo][$contains]=' + this.$route.params.searchTerms)
          .then(responseBody => {
            bodyPosts = responseBody.data.data

            this.scorePosts(titlePosts, bodyPosts, keyWordsPosts)

            resolve()
          })
      }))

      Promise.all(arrayPromises).then(() => {

        this.boolean = true

        loadingComponent.close()

      })

    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    resizeListener() {
      this.windowHeight = window.innerHeight * 0.3;
      this.windowWidth = window.innerWidth;
    },
    
    paginatePosts(allPosts) {
      var tmpArray = [];

      for (var i = 0; i < allPosts.length; i++) {
        tmpArray.push(allPosts[i]);

        if (tmpArray.length === this.postsPerPage) {
          this.paginatedPosts.push(tmpArray);
          tmpArray = [];
        }
      }

      if (tmpArray.length > 0) {
        this.paginatedPosts.push(tmpArray);
      }
    },

    scorePosts(titlePosts, bodyPosts, keyWordsPosts) {
      let titlePromises = []
      let termsPromises = []
      let bodyPromises = []
      let deleteZerosPromises = []

      this.allPosts.forEach((post, index) => {
        post.score = 0

        titlePosts.forEach((titlePost, index0) => {
          titlePromises.push(new Promise((resolve, reject) => {
            if (titlePost.id == post.id)
              post.score += 400

            resolve()
          }))
        })

        this.searchTerms.forEach((term, index1) => {
          termsPromises.push(new Promise((resolve, reject) => {
            if (keyWordsPosts[index].title.includes(term))
              post.score += 300

            if (keyWordsPosts[index].tags.includes(term))
              post.score += 50

            resolve()
          }))
        })

        bodyPosts.forEach((bodyPost, index2) => {
          bodyPromises.push(new Promise((resolve, reject) => {
            if (bodyPost.id == post.id)
              post.score += 10

            resolve()
          }))
        })

        let tmpArrayPosts = []

        this.allPosts.forEach(post => {
          deleteZerosPromises.push(new Promise((resolve, reject) => {
            if (post.score > 0)
              tmpArrayPosts.push(post)

            resolve()
          }))

        })

        Promise.all(titlePromises).then(() => {
          Promise.all(termsPromises).then(() => {
            Promise.all(bodyPromises).then(() => {
              Promise.all(deleteZerosPromises).then(() => {
                this.allPosts = tmpArrayPosts
                this.paginatedPosts = []

                this.allPosts.sort(function (a, b) {
                  return b.score - a.score
                })

                this.pages = Math.ceil(this.allPosts.length / this.postsPerPage)

                if (this.pages > 1)
                  this.paginatePosts(this.allPosts)

                else
                  this.paginatedPosts = [[...this.allPosts]]
              })
            })
          })
        })
      })
    },

    searchPosts(searchBarTerms) {
      if (searchBarTerms != '')
        this.$router.push(`/search/${searchBarTerms}/1`)
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