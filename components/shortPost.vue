<template>
    <div class="block columns is-vcentered">
        <div class="column is-3">
            <b-image
                :src="img"
                :alt="'Imagen del post' + title"
                ratio="1by1"
                responsive
            ></b-image>
        </div>
        <div class="block column is-11 mx-5">
            <h3 class="title mt-3 mb-0"> {{ title }} </h3>
            <p class="content"> {{ textPreview }} </p>
        </div>
    </div>
  </template>
  
  <script>  
  export default {
    name: 'textPreviewPost',
    props: ['img', 'title', 'text'],
    data() {
      return {
        textPreview: '',
        maxCharsPerLine: 130
      }
    },
    async mounted() {
      if (this.text.length > this.maxCharsPerLine)
        this.textPreview = this.text.slice(0, this.maxCharsPerLine)

        this.textPreview += '...'
    },
    methods: {
  
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