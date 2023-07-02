<template >
  <div class="block columns is-vcentered is-centered ml-1">
    <div :class="imgClass">
      <img v-if="img !== null" :src="process.env.BACKEND_URL + this.img[0].attributes.url" :alt="altImg">

      <img v-else src="../assets/women@infLogoPequeño.png" :alt="altImg">
    </div>

    <div :class="txtClass" :style="widthText">
      <h3 :class="titleClass" :style="colorTitle"> {{ title }} </h3>

      <template lang="md">
        <div v-html="$md.render(textPreview)"></div>
      </template>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'shortPost',
  props: ['img', 'title', 'text', 'size'],
  data() {
    return {
      textPreview: '',
      maxCharsPerLine: 130,
      maxCharsTitleShort: 22,
      imgClass: 'column is-3',
      txtClass: 'block column is-11 mx-5',
      ratioImg: '1by1',
      titleClass: 'title mt-3',
      colorTitle: 'color: #121212',
      widthText: 'width: 70%',
      altImg: '',
      windowHeight: 0,
      windowWidth: 0
    }
  },
  async mounted() {
    window.addEventListener("resize", this.resizeListener)
    this.resizeListener()

    this.altImg = 'Imagen de "' + this.title + '"'

    if (this.windowWidth >= 770) {
      if (this.size == 'small') {
        this.imgClass = 'column is-half ml-4 mr-2'
        this.txtClass = 'block column is-half'
        this.titleClass = 'mt-3 is-size-5',
          this.colorTitle = 'color: #fff'
        this.widthText = 'width: 40%'
        this.maxCharsPerLine = 50

        if (this.title.length > this.maxCharsTitleShort) {
          this.title = this.title.slice(0, this.maxCharsTitleShort - 3)

          this.title += '...'
        }

      }
      else if (this.size == 'big') {
        this.imgClass = 'column is-3 ml-2 mr-2'
        this.txtClass = 'block column is-9 mr-2'
        this.titleClass = 'title mt-3 is-size-4'
        this.colorTitle = 'color: #121212'
        this.widthText = 'width: 70%'
        this.maxCharsPerLine = 500
      }
    }

    if (this.text.length > this.maxCharsPerLine) {
      this.textPreview = this.text.slice(0, this.maxCharsPerLine)

      this.textPreview += '...'
    }
    else
      this.textPreview = this.text
  },
  methods: {
    resizeListener() {
      this.windowHeight = window.innerHeight * 0.3;
      this.windowWidth = window.innerWidth;

      if (this.windowWidth < 770) {
        this.imgClass = 'column is-full is-flex is-flex-direction-column is-justify-content-center is-align-items-center'
        this.txtClass = 'block column is-12 is-flex is-flex-direction-column is-justify-content-center is-align-items-center'
        this.ratioImg = '1by1'
        this.colorTitle = 'font-size: 22px;'
        this.titleClass = 'title mt-3 has-text-centered'
        this.widthText = 'width: 100%'

        if (this.size == 'small')
          this.colorTitle += ' color: #fff'
      }
    }
  }
}
</script>
  
<style scoped>
h3 {
  font-size: 20px;
  width: 75%;
}

p {
  width: 75%
}
</style>