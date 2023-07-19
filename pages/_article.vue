<template>
  <div v-if="boolean" class="tile is-ancestor is-flex-wrap-wrap" :style="windowWidth < 770 ? 'margin-left: 5%; margin-right: 5%' : ''">
    <div class="header tile is-parent is-12 mt-5 has-text-centered" :style="styleHeader">
      <img class="bgImage tile is-child is-inline-block" :style="styleHeaderImg"
        v-if="post.attributes.media.data !== null"
        :src="post.attributes.media.data[0].attributes.url" />

      <h1 class="title overText"  :style="windowWidth >= 770 ? 'top: 60%; left: 9%;' : 'top: 25%; left: 10%; right: 10%; font-size: 30px'"> {{ title }} </h1>
    </div>

    <div class="body tile is-parent mb-5">
      <div :class="windowWidth >= 770 ? 'tile is-ancestor is-flex-wrap-wrap mt-2 ml-6' : 'tile is-ancestor is-flex-wrap-wrap mt-2'">
        <template v-for="(item, index) in body">
          <template v-if="item.title">
            <div v-if="'imgUrl' in body[index + 1] && !body[index + 1].imgPos && windowWidth >= 770" class="tile is-parent is-4">
              
            </div>

            <div v-if="windowWidth < 770" class="tile is-parent is-6 mt-3" style="margin-left: 2%">
              <h2 class="title bodyContent mt-5 tile is-child" style="font-size: 25px;"> {{ item.txt }}
              </h2>
            </div>
            
            <div v-else class="tile is-parent is-6 mt-3" :style="(body[index + 1].imgPos || !('imgPos' in body[index + 1]) || index == 0) ? 'margin-left: 4%' : 'margin-left: 7.8%'">
              <h2 class="title bodyContent mt-5 tile is-child" style="font-size: 25px;"> {{ item.txt }}
              </h2>
            </div>

            <div v-if="'imgUrl' in body[index + 1] && body[index + 1].imgPos && windowWidth >= 770" class="tile is-parent is-4 mb-5">
              
            </div>
          </template>

          <template v-else-if="windowWidth < 770">
            <div style="display: inline-block; margin-left: 5%; margin-right: 5%" v-html="$md.render(item.txt)"></div>
            <br>

            <div v-if="post.attributes.media.data !== null" class="tile is-parent is-4 imgContainer my-5 mr-5"
              style="margin-left: 4%; margin-right: 4%">
              <img :style="{'max-height': imgHeightStyle}" class="tile is-child" :src="item.imgUrl">
            </div>
          </template>

          <template v-else-if="'imgUrl' in item">
            <div v-if="!item.imgPos && windowWidth >= 770" class="tile is-parent is-4 imgContainer my-5"
              style="margin-left: 4%; margin-right: 4%">
              <img :style="{'max-height': imgHeightStyle}" class="tile is-child" :src="item.imgUrl">
            </div>

            <div :class="'tile is-vertical is-6' + txtMargins" :style="item.imgPos ? 'margin-left: 4%': ''">
              <div class="tile is-parent">
                <div style="display: inline-block" class="tile is-child" v-html="$md.render(item.txt)"></div>
              </div>

              <div class="tile is-parent">
                <div style="display: inline-block" class="tile is-child" v-html="$md.render(body[index + 1].txt)"></div>
              </div>
            </div>

            <div v-if="item.imgPos || windowWidth < 770" class="tile is-parent is-4 imgContainer my-5 mr-5"
              style="margin-left: 4%; margin-right: 4%">
              <img :style="{'max-height': imgHeightStyle}" class="tile is-child" :src="item.imgUrl">
            </div>
          </template>

          <template v-else-if="item.render" lang="md">
            <div style="display: inline-block; margin-left: 5%; margin-right: 9%; margin-bottom: 2%" v-html="$md.render(item.txt)"></div>
          </template>
        </template>

        <br>
      </div>
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
      title: '',
      body: [],
      post: {},
      windowHeight: 0,
      windowWidth: 0,
      styleHeader: 'height: ',
      styleHeaderImg: 'width: ',
      paragraphsHeights: [],
      imgHeightStyle: '100%',
      txtMargins: ''
    }
  },
  async mounted() {
    await axios.get('https://pristine-biscayne-20430-612b2c9251a8.herokuapp.com/api/publicaciones?populate=media&filters[id][$eq]=' + this.$route.params.id)
      .then((response) => {
        this.post = response.data.data[0]

        window.addEventListener("resize", this.resizeListener)
        this.resizeListener()

        let bodyTmp = []

        this.title = this.post.attributes.titulo
        bodyTmp = this.post.attributes.cuerpo.split(/\r?\n/)

        bodyTmp.forEach((item) => {
          if (item[0] == '#')
            this.body.push({ txt: item.substring(item.indexOf("# ") + 2), title: true, render: true })
          else
            this.body.push({ txt: item, title: false, render: true })
        })

        this.body = this.body.filter((item) => item.txt !== "")

        if (this.post.attributes.media.data !== null) {
          let pos = true
          let imgIndex = 0

          let num = 0

          if (this.body.length < 6)
            num = 2
          else
            num = 3


          for (let i = 0; i < this.body.length; i++) {
            if (i > 1 && i % num == 0 && i < this.body.length - 2) {
              if (this.body[i].title) {
                this.body[i + 1].imgUrl = this.post.attributes.media.data[imgIndex % this.post.attributes.media.data.length].attributes.url
                this.body[i + 1].imgPos = pos
                
                if (i < this.body.length - 3)
                  this.body[i + 2].render = false
              }
              else {
                this.body[i].imgUrl = this.post.attributes.media.data[imgIndex % this.post.attributes.media.data.length].attributes.url
                this.body[i].imgPos = pos
                this.body[i + 1].render = false
              }

              pos = !pos

              imgIndex++
            }

            if (i == this.body.length - 1) {
              this.boolean = true
            }
          }
        }
      })
  },
  methods: {
    resizeListener() {
      this.windowHeight = window.innerHeight * 0.3;
      this.windowWidth = window.innerWidth;

      if (this.windowWidth < 770) 
        this.styleHeaderImg = 'width: 130%; height: 130%'
      else {
        this.styleHeaderImg += Math.round(this.windowWidth).toString() + 'px'
      }
      
      this.styleHeader += Math.round(this.windowHeight).toString() + 'px'


      let underLimit = 1215
      let overLimit = 1400

      if (this.windowWidth < overLimit && this.windowWidth >= underLimit) 
        this.imgHeightStyle = ((this.windowWidth) * 100) / overLimit
      
      else if (this.windowWidth < underLimit) 
        this.imgHeightStyle = (((this.windowWidth) * 100) / underLimit) / 2

      this.imgHeightStyle = this.imgHeightStyle.toString() + '%'

      if (this.windowWidth < 770) {
        this.txtMargins = 'txtMargins'
      }
    }
  }
}
</script>
  
<style scoped>
.bgImage {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(5px)
}

.overText {
  position: absolute;
  z-index: 3;
  background-color: #f0eff4;
  color: #121212
}

.header {
  position: relative;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
  /* background-image: url("../assets/women@infLogo.png");
  background-repeat: no-repeat;
  background-size: 100%; */
}

.body {
  background-color: #bdd0db;
  border-radius: 0 0 5px 5px;
}

.bodyContent {
  margin-left: 5%;
}

.imgContainer {
  display: flex;
  justify-content: center;
}

.imgContainer img {
  width: auto;
  height: auto;
}

.txtMargins {
  margin-left: 4%;
  margin-right: 4%
}

</style>