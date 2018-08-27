<template>
  <div id="around">
    <h1>Autour de moi</h1>
    <v-layout row wrap>
      <v-flex xs12>
        <iframe class="elevation-4" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.4486688273014!2d4.863675915888612!3d45.78223837910598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4eaa2bad3fb5b%3A0x556a00d4545126ce!2sB%C3%A2timent+Nautibus%2C+69100+Villeurbanne!5e0!3m2!1sfr!2sfr!4v1518537792849" frameborder="0" allowfullscreen></iframe>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'AroundMe'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  iframe {
    border:0;
    width: 100%;
    height: calc(100vh - 154px);
  }
</style>
