<template>
  <div>
    <nav v-if="windowWidth >= 691" class="navbar customNav columns" role="navigation" aria-label="main navigation">
      <div class="navbar-brand column is-4 content has-text-centered">
        <a class="navbar-item is-inline-block" href="https://www.women-inf.eu/">
          <img class="customImgSize mt-2" src="../assets/women@infLogo.png">
        </a>
      </div>

      <div class="navbar-menu column">
        <div class="navbar-start columns is-centered mt-2">
          <a class="navbar-item navbarLink" href="https://www.women-inf.eu/">
            Inicio
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link navbarLink">
              El proyecto
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item navbarLink"
                href="https://www.women-inf.eu/situacion-de-la-investigacion-en-informatica/">
                Situación actual
              </a>
              <a class="navbar-item navbarLink" href="https://www.women-inf.eu/equipo/">
                Equipo
              </a>
              <a class="navbar-item navbarLink" href="https://www.women-inf.eu/sociedades-cientificas/">
                Sociedades científicas
              </a>
              <a class="navbar-item navbarLink" href="https://www.women-inf.eu/noticias/">
                Noticias
              </a>
            </div>
          </div>

          <a class="navbar-item navbarLink" href="https://www.women-inf.eu/listado-de-recursos/">
            Listado de recursos
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link navbarLink">
              Mapa de iniciativas
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item navbarLink" href="https://www.women-inf.eu/formulario-de-iniciativas/">
                Enviar iniciativas
              </a>
            </div>
          </div>

          <!-- <nuxt-link class="navbar-item navbarLink" to="/form">
            Te escuchamos
          </nuxt-link> -->

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link navbarLink">
              Artículos e iniciativas
            </a>

            <div class="navbar-dropdown">
              <nuxt-link class="navbar-item navbarLink" to="/">
                Artículos
              </nuxt-link>
              <nuxt-link class="navbar-item navbarLink" to="/form">
                Te escuchamos
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>


    <nav v-else class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item ml-2" href="https://www.women-inf.eu/">
          <img src="../assets/women@infLogo.png">
        </a>

        <a role="button"
          class="navbar-burger container is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
          aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <div style="margin-left: 60%" @click="openMenu()">
            <font-awesome-icon v-if="!isOpenMenu" :icon="['fas', 'bars']" style="font-size: 30px;"></font-awesome-icon>
            <font-awesome-icon v-else :icon="['fas', 'xmark']" style="font-size: 30px;"></font-awesome-icon>
          </div>
        </a>
      </div>

      <transition name="menu">
        <div v-show="isOpenMenu" id="navbarBasicExample" class="navbar-menu is-active">
          <a class="navbar-item navbarLink" href="https://www.women-inf.eu/">
            Inicio
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link navbarLink">
              El proyecto
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item navbarLink"
                href="https://www.women-inf.eu/situacion-de-la-investigacion-en-informatica/">
                Situación actual
              </a>
              <a class="navbar-item navbarLink" href="https://www.women-inf.eu/equipo/">
                Equipo
              </a>
              <a class="navbar-item navbarLink" href="https://www.women-inf.eu/sociedades-cientificas/">
                Sociedades científicas
              </a>
              <a class="navbar-item navbarLink" href="https://www.women-inf.eu/noticias/">
                Noticias
              </a>
            </div>
          </div>

          <a class="navbar-item navbarLink" href="https://www.women-inf.eu/listado-de-recursos/">
            Listado de recursos
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link navbarLink">
              Mapa de iniciativas
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item navbarLink" href="https://www.women-inf.eu/formulario-de-iniciativas/">
                Enviar iniciativas
              </a>
            </div>
          </div>

          <nuxt-link class="navbar-item navbarLink" to="/form">
            Te escuchamos
          </nuxt-link>
        </div>
      </transition>
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
      isOpenMenu: false

    }
  },
  watch: {
    '$route'() {
      this.closeMenu()
    }
  },
  mounted() {
    window.addEventListener("resize", this.resizeListener)
    this.resizeListener()
  },
  unmounted() {
    this.isOpenMenu = false
  },
  methods: {
    resizeListener() {
      this.windowHeight = window.innerHeight * 0.6;
      this.windowWidth = window.innerWidth * 0.9;
    },

    openMenu() {
      this.isOpenMenu = !this.isOpenMenu
      console.log(this.isOpenMenu)
    },

    closeMenu() {
      this.isOpenMenu = false
      console.log('holaquetal')
    }
  }
}
</script>

<style>
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

.menu-enter-active,
.menu-leave-active {
  transition: transform 0.5s ease
}

/* .menu-enter-active {
  transition-delay: 0.5s
} */

.menu-enter,
.menu-leave-to {

  transform: translateY(-500px)
}

.menu-enter-to,
.menu-leave {

  transform: translateY(0px)
}
</style>


