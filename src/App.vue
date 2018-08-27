<template>
  <v-app id="app" class="white">
    <!--<img src="./assets/logo.png">-->
    <v-container text-xs-center>
      <router-view/>
      <div style="height: 56px;"></div>
    </v-container>
    <nav-bar></nav-bar>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
</style>
