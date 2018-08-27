<template>
  <v-bottom-nav fixed shift :value="true" :active.sync="e1" color="light-blue">
    <router-link to="/">
      <v-btn flat color="white" value="HelloWorld">
        <span>Accueil</span>
        <v-icon>home</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/myaddresses">
      <v-btn flat color="white" value="MyAddresses">
        <span>Mes adresses</span>
        <v-icon>assignment</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/aroundme">
      <v-btn flat color="white" value="AroundMe">
        <span>Autour de moi</span>
        <v-icon>map</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/ar">
      <v-btn flat color="white" value="AugmentedReality">
        <span>Vidéo</span>
        <v-icon>camera_alt</v-icon>
      </v-btn>
    </router-link>
  </v-bottom-nav>
</template>

<script>
export default {
  name: 'nav-bar',
  data () {
    return {e1: this.$route.name}
  }
}
</script>

<style scoped>
.router-link-exact-active{
  box-shadow: 0px 0px 5px rgba(0,0,0,0);
  background-color: #FFBC1F;
}

.bottom-nav a {
  text-decoration: none !important;
}

@media screen and (max-width: 992px) {
  .bottom-nav a {
    width: 25%;
  }

  .bottom-nav button {
    max-width: 100%;
    width: 100%;
  }
}

@media screen and (max-width: 400px) {

  .bottom-nav .btn--active {
    min-width: 0;
  }

  .bottom-nav .btn--active .btn__content {
    min-width: 0;
    padding: 0;
  }

  .bottom-nav .router-link-exact-active span {
    display: none;
  }
}
</style>
