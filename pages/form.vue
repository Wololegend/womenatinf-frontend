<template>

  <!-- There are three <sections>. Each one of them is a tile that contains: the title, the explanation and the form. -->

  <div class="columns is-multiline is-centered mt-5">
    
    <!-- TITLE -->
    <section class="column is-12 titleTileBorder">
      <article class="tile is-child notification titleTile is-full has-text-centered">
        <h1 class="title is-inline-block my-0" style="  font-size: 35px !important;"> Te escuchamos </h1>
      </article>
    </section>

    <!-- EXPLANATION -->

      <section class="column is-half notification bgInfo info mt-5">
        <div class="mt-5 mx-0 columns is-multiline">
          <div class="column is-10">
            <p
              class="title"
              style="font-size: 25px;"
            >
                Nos interesan tus proyectos
            </p>

            <p class="subtitle"> Inspira a otras informáticas </p>
          </div>
          <!-- <font-awesome-icon class="column is-2 fa-4x" :icon="['fas', 'comment']" :title="$t('Suggestions')"/> -->
        </div>
        <div class="content mx-3 mb-5">
          <br>

          <p class="block">
            ¡Únete a nuestra comunidad de mujeres en la tecnología y comparte tus proyectos e investigaciones!
          </p>

          <br>

          <p class="block">
            En un mundo donde la tecnología avanza a pasos agigantados, es fundamental reconocer y destacar el
            increíble trabajo que las mujeres están llevando a cabo en el campo de la informática. En nuestro sitio
            web, nos enorgullece mostrar los proyectos y avances realizados por mujeres en la industria de la
            tecnología de la información.
          </p>

          <br><br>

          <p class="box quote">
            <span style="font-style: italic; font-weight: bold; font-size: 20px;">
              "La información nos ayuda a ver que no estamos solas. Es por eso que las bibliotecas nos ayudan no solo
              a ver que no estamos solas, sino que nuestra situación no es muy diferente a la de los demás."
            </span>

            <br><br>

            <span style="font-size: 17px;">
              Maya Angelou, activista por los derechos civiles.
            </span>
          </p>
        </div>
      </section>

      <!-- FORM -->
      <section class="column is-half notification form bgForm mt-5">
        <p
          class="title mt-5 mx-3"
          style="font-size: 25px"
        >
          Aquí va tu propuesta
        </p>

        <form
          ref="form"
          @submit.prevent="sendFormInfo()"
        >

          <!-- NAME -->
          <div class="field mb-5 mx-3">
            <label class="label">
              Nombre completo (persona física u organización)
            </label>

            <div class="control has-icon-left">
              <input
                v-model="name"
                class="input"
                type="text" 
                placeholder="Ada Lovelace"
              />
            </div>
          </div>

          <!-- EMAIL -->
          <div class="field mb-5 mx-3">
            <label class="label">
              Email
            </label>

            <div class="control">
              <input
                v-model="email"
                class="input"
                type="text"
                placeholder="lovelace_ada@email.com"
              />
            </div>

            <p
              v-if="correctEmailFormat"
              class="help is-danger"
            >
              {{ correctEmailMessage }}
            </p>
          </div>

          <!-- DESCRIPTION -->
          <div class="field mb-5 mx-3">
            <label class="label">
              Descripción de la iniciativa
            </label>

            <div class="control">
              <textarea
                v-model="description"
                class="textarea"
                rows="4"
                type="text"
                placeholder="El wifi es una tecnología que permite la interconexión inalámbrica de dispositivos electrónicos que..."
              ></textarea>

              <p
                v-if="correctDescriptionFormat"
                class="help is-danger"
              >
                {{ correctDescriptionMessage }}
              </p>
            </div>
          </div>

          <!-- LINKS -->
          <div class="field mb-5 mx-3">
            <label class="label">
              Enlace a páginas o documentos relacionados
            </label>

            <div class="control">
              <textarea
                v-model="links"
                class="textarea"
                rows="2"
                type="text"
                placeholder='Web de Women@Inf - https://www.women-inf.eu/'
              ></textarea>
            </div>

            <p
              v-if="correctLinksFormat"
              class="help is-danger"
            >
              {{ correctLinksMessage }}
            </p>
          </div>

          <!-- <div class="field mb-5 mx-3">
              <b-field class="file">
                <b-upload v-model="files" multiple expanded>
                  <a class="button customButton is-fullwidth">
                    <b-icon icon="upload"></b-icon>
                    <span> Haz click para subir tus archivos </span>
                  </a>
                </b-upload>
              </b-field>
              <b-field>
                <b-upload v-model="files" multiple drag-drop expanded>
                  <section class="section">
                    <div class="content has-text-centered">
                      <p>
                        <b-icon icon="upload" size="is-large"></b-icon>
                      </p>
                      <p>Arrastra aquí tus archivos para subirlos</p>
                    </div>
                  </section>
                </b-upload>
              </b-field>

              <div class="tags">
                <span v-for="(file, index) in files" :key="index" class="tag customTags">
                  {{ file.name }}
                  <button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
                </span>
              </div>
            </div> -->

          <div class="field mx-3">
            <button class="button is-medium mt-4">
              Enviar
            </button>
          </div>
        </form>
      </section>
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
      correctEmailFormat: false,
      correctEmailMessage: 'Introduce un email válido.',
      correctDescriptionFormat: false,
      correctDescriptionMessage: 'La descripción debe tener al menos 50 caracteres.',
      correctLinksFormat: false,
      correctLinksMessage: 'Debes darnos al menos un enlace donde ampliar la información.',
      // files: [],
      // dropFiles: [],
      email: '',
      name: '',
      description: '',
      links: ''
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
          )
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
  height: auto
}

.bgForm {
  background-color: #f0eff4;
  height: auto
}

.info {
  color: #fff
}

.titleTile {
  color: #5a869b;
  background-color: #fff;

}

.titleTileBorder {
  border: 3px dashed #5a869b;
  border-radius: 5px;
}
</style>
  