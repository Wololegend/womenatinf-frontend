<template>
  <div>
    <section class="tile is-parent columns is-centered mt-5">
      <article class="tile is-child notification bgInfo info is-6">
        <div class=" mt-5 mx-0 columns is-multiline">
          <div class="column is-10">
            <p class="title" style="font-size: 25px;"> Nos interesan tus proyectos</p>
            <p class="subtitle"> Inspira a otras informáticas </p>
          </div>
          <!-- <font-awesome-icon class="column is-2 fa-4x" :icon="['fas', 'comment']" :title="$t('Suggestions')"/> -->
        </div>
        <div class="content mx-3">
          <p class="block">
            ¡Únete a nuestra comunidad de mujeres en la tecnología y comparte tus proyectos e investigaciones!
          </p>

          <p class="block">
            En un mundo donde la tecnología avanza a pasos agigantados, es fundamental reconocer y destacar el
            increíble trabajo que las mujeres están llevando a cabo en el campo de la informática. En nuestro sitio
            web, nos enorgullece mostrar los proyectos y avances realizados por mujeres en la industria de la
            tecnología de la información. 
          </p>

          <br>

          <p class="box quote">
            <span style="font-style: italic; font-weight: bold; font-size: 20px;">
              "La información nos ayuda a ver que no estamos solas. Es por eso que las bibliotecas nos ayudan no solo
              a ver que no estamos solas, sino que nuestra situación no es muy diferente a la de los demás."
            </span>
            <br> <br>
            <span style="font-size: 17px;">
              Maya Angelou, activista por los derechos civiles.
            </span>
          </p>
        </div>
      </article>

      <article class="tile is-child notification form is-6 bgForm">
        <p class="title mt-5 mx-3" style="font-size: 25px"> Aquí va tu propuesta </p>

        <form ref="form" @submit.prevent="sendFormInfo()">
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

            <p v-if="correctEmailFormat == false" class="help is-danger">
              correctEmailMessage
            </p>
          </div>

          <div class="field mb-5 mx-3">
            <label class="label">
              Descripción de la iniciativa
            </label>

            <div class="control">
              <textarea
                v-model="suggestion"
                class="textarea"
                rows="5"
                type="text"
                placeholder="El wifi es una tecnología que permite la interconexión inalámbrica de dispositivos electrónicos que...">
              </textarea>

              <p v-if="correctSuggestionFormat == false" class="help is-danger">
                correctSuggestionMessage
              </p>
            </div>
          </div>

          <div class="field mb-5 mx-3">
            <label class="label">
              Enlace a páginas o documentos relacionados
            </label>

            <div class="control">
              <textarea
                v-model="suggestion"
                class="textarea"
                rows="2"
                type="text"
                placeholder='Web de Women@Inf - https://www.women-inf.eu/'>
              </textarea>
            </div>

            <p v-if="correctSubjectFormat == false" class="help is-danger">
              correctSubjectMessage
            </p>
          </div>

          <div class="field mb-5 mx-3">
            <button class="button is-medium">
              Enviar
            </button>
          </div>
        </form>
      </article>
    </section>
  </div>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'IndexPage',
  components: {
    Card
  },
  data() {
    return {
      correctEmailFormat: true,
      correctEmailMessage: '',
      correctSuggestionFormat: true,
      correctSuggestionMessage: '',
      correctSubjectFormat: true,
      correctSubjectMessage: '',
      name: '',
      email: '',
      suggestion: '',
      

    }
  },
  methods: {
    sendFormInfo() {}
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
</style>
  