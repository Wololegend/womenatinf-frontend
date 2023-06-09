<template>
    <div class="columns is-multiline is-centered">
      <div class="header column is-12 mt-5 has-text-centered" :style="styleHeader">
        <img class="bgImage is-inline-block" :style="styleHeaderImg" v-if="boolean" :src="'http://localhost:1337' + post.attributes.media.data[0].attributes.url"/>

        <h1 class="title overText"> {{ title }} </h1>
      </div>

      <div class="body column is-12">
        <template v-for="(item, index) in body">
          <h1 v-if="item.title" class="title bodyContent mt-5" style="font-size: 25px;"> {{ item.txt }} </h1>

          <template v-else lang="md">
            <div v-html="$md.render(item.txt)" class="bodyContent"></div>
            <br v-if="index < body.length - 1">
          </template>
        </template>
      </div>
    </div>
</template>
  
  <script>
  import axios from 'axios'

  export default {
    name: 'Article',
    data() {
      return {
        boolean: false,
        idString: '',
        title: 'Hola',
        body: [],
        post: {},
        windowHeight: 0,
        windowWidth: 0,
        styleHeader: 'height: ',
        styleHeaderImg: 'width: '
      }
    },
    async mounted() {
      let article = this.$route.params.article
      let tmpArray = []
      let i = article.length - 1

      while (i >= 0 && article[i] != '+') {
        tmpArray.unshift(article[i])

        i--
      }

      tmpArray.forEach(number => {
        this.idString += number
      })

      await axios.get('http://localhost:1337/api/publicaciones?populate=media&filters[id][$eq]=' + this.idString)
        .then((response) => {
          this.boolean = true

          this.post = response.data.data[0]

          window.addEventListener("resize", this.resizeListener)
          this.resizeListener()

          // console.log(this.post)
          
          let bodyTmp = []

          this.title = this.post.attributes.titulo
          bodyTmp = this.post.attributes.cuerpo.split(/\r?\n/)

          bodyTmp.forEach((item) => {
            if(item[0] == '#')
              this.body.push({txt: item.substring(item.indexOf("# ") + 2), title: true})
            else
              this.body.push({txt: item, title: false})
          })

          console.log(this.body)
        })
    },
    methods: {
      resizeListener() {
        this.windowHeight = window.innerHeight*0.3;
        this.windowWidth = window.innerWidth;

        this.styleHeader += Math.round(this.windowHeight).toString() + 'px'
        this.styleHeaderImg += Math.round(this.windowWidth).toString() + 'px'
      }
    }
  }
  </script>
  
  <style scoped>

  .bgImage {
    position:absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: blur(5px)
  }

  .overText {
    position:absolute;
    z-index: 1;
    top: 60%;
    left: 5%;
    background-color: #f0eff4;
    color: #121212
  }

  .header {
    position: relative;
    overflow: hidden;
    border-radius: 5px 5px 0 0;
  }

  .body {
    background-color: #bdd0db;
    border-radius: 0 0 5px 5px;
  }

  .bodyContent {
    margin-left: 5%;
    margin-right: 5%
  }

  </style>