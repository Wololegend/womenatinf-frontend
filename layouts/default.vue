<template>
  <div>
    <nav v-if="windowWidth >= 691" class="navbar customNav columns" role="navigation" aria-label="main navigation">
      <div class="navbar-brand column is-5 content has-text-centered">
        <a class="navbar-item is-inline-block">
          <img class="customImgSize mt-2" src="../assets/women@infLogo.png">
        </a>
      </div>

      <div class="navbar-menu column">
        <div class="navbar-start columns is-centered mt-2">
          <a class="navbar-item navbarLink">
            Inicio
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link navbarLink">
              El proyecto
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item navbarLink">
                Situación actual
              </a>
              <a class="navbar-item navbarLink">
                Equipo
              </a>
              <a class="navbar-item navbarLink">
                Sociedades científicas
              </a>
              <a class="navbar-item navbarLink">
                Noticias
              </a>
            </div>
          </div>

          <a class="navbar-item navbarLink">
            Listado de recursos
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link navbarLink">
              Mapa de iniciativas
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item navbarLink">
                Enviar iniciativas
              </a>
            </div>
          </div>

          <nuxt-link class="navbar-item navbarLink" to="/form">
            Te escuchamos
          </nuxt-link>
        </div>
      </div>
    </nav>

    <nav v-else class="navbar customNav columns" role="navigation" aria-label="main navigation">
      <div class="navbar-brand column is-6">
        <a class="navbar-item">
          <img class="customImgSize" src="../assets/women@infLogo.png">
        </a>
      </div> 
      
      <div class="navbar-start column is-6">
        <b-button class="navbar-item" label="~Menú~" @click="isOpenMenu = !isOpenMenu" :aria-expanded="isOpenMenu" aria-controls="burguerMenu"></b-button>
      </div>
    </nav>

    <section class="main-content columns">
      <div class="container column is-12">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      windowHeight: 0,
      windowWidth: 0,
      isOpenMenu: true
    }
  },
  mounted() {
    window.addEventListener("resize", this.resizeListener)
    this.resizeListener()
  },
  methods: {
    resizeListener() {
      this.windowHeight = window.innerHeight*0.6;
      this.windowWidth = window.innerWidth*0.9;
    }
  }
}
</script>

<style>
/* @font-face {
  font-family: 'Montserrat';
  src: url('../assets/fonts/Montserrat-VariableFont_wght.ttf') format('truetype');
}

@font-face {
  font-family: 'Montserrat';
  font-style: italic;
  src: url('../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf') format('truetype');
}

@font-face {
  font-family: 'Montserrat';
  font-style: bold;
  src: url('../assets/fonts/Montserrat-Bold.ttf') format('truetype');
}

@font-face {
  font-family: 'Montserrat';
  font-style: bolder;
  src: url('../assets/fonts/Montserrat-ExtraBold.ttf') format('truetype');
} */

.customNav {
  height: 3.72rem;
  /* font-family: 'Montserrat', sans-serif; */
  font-style: normal;
  font-size: 17px;
  font-weight: bold;
  line-height: 22px;
  color: #121212;
}

.customImgSize {
  height: 3.5rem
}

.navbarLink:hover {
  color: #687c87 !important;
  background-color: white !important
}
</style>


