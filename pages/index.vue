<template>
  <div>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'IndexPage',
  components: {
  },
  data() {
    return {
      
    }
  },
  methods: {
    async sendFormInfo() {
      const regex = /^[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/

      if ((this.email != "") && (regex.test(this.email) == true))
        this.correctEmailFormat = false
      else
        this.correctEmailFormat = true

      if (this.description.length > 50)
        this.correctDescriptionFormat = false
      else 
        this.correctDescriptionFormat = true

      if (this.links.length > 0)
        this.correctLinksFormat = false
      else
        this.correctLinksFormat = true

      if (!this.correctEmailFormat && !this.correctDescriptionFormat && !this.correctLinksFormat) {
        try {
          await axios.post('http://localhost:1337/api/propuestas',
          {
            'data': {
              'fecha': new Date(),
              'email': this.email,
              'nombre': this.name,
              'descripcion': this.description,
              'link': this.links
            } 
          }
          ).then(response => {
            console.log(response.data)
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
    deleteDropFile(index) {
      this.files.splice(index, 1);
    }
  }
}
</script>

<style scoped>
.quote {
  color: #121212;
  background-color: #f0eff4;
}

.content {
  font-size: 17px
}

.label {
  font-family: "Roboto", sans-serif;
  font-size: 17px
}

button {
  color: #fff;
  background-color: #32576e;
}

.bgInfo {
  background-color: #32576e;
}

.bgForm {
  background-color: #f0eff4;
}

.info {
  color: #fff
}

.customButton {
  background-color: #32576e;
  color: #fff;
}

.customTags {
  background-color: #32576e;
  color: #fff;
}

.titleTile {
  color: #5a869b;
  background-color: #fff;
  border: 3px dashed #5a869b;
}
</style>
  