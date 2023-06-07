<template >
    <div class="block columns is-vcentered">
        <div :class="imgClass">
            <!-- <b-image
                style="height:10rem"
                :src="img"
                :alt="'Imagen del post' + title"
                :ratio="ratioImg"
                responsive
            ></b-image> -->

            <img
              :src="img"
              :alt="'Imagen del post' + title"
            >
        </div>

        <div :class="txtClass" :style="widthText">
            <h3 :class="titleClass" :style="colorTitle"> {{ title }} </h3>

            <!-- <p :class="contentClass"> {{ textPreview }} </p> -->

            <template lang="md">
              <div v-html="$md.render(textPreview)"></div>
            </template>
        </div>
    </div>
  </template>
  
  <script>  
  export default {
    name: 'shortPost',
    props: ['img', 'title', 'text', 'small'],
    data() {
      return {
        textPreview: '',
        maxCharsPerLine: 130,
        imgClass: 'column is-3',
        txtClass: 'block column is-11 mx-5',
        ratioImg: '1by1',
        titleClass: 'title mt-3',
        contentClass: 'content',
        colorTitle: 'color: #121212',
        widthText: 'width: 70%'
      }
    },
    async created() {
      if (this.small) {
        this.imgClass = 'column is-half ml-4 mr-2'
        this.txtClass = 'block column is-half'
        this.ratioImg = ''
        this.titleClass = 'mt-3 is-size-5',
        this.contentClass = 'content is-size-7'
        this.colorTitle = 'color: #fff'
        this.widthText = 'width: 40%'
        this.maxCharsPerLine = 50
      }

      if (this.text.length > this.maxCharsPerLine) {
        this.textPreview = this.text.slice(0, this.maxCharsPerLine)

        this.textPreview += '...'
      }
    },
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