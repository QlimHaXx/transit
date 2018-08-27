<template>
  <div id="selectplace">
    <v-form v-model="valid" ref="form" lazy-validation style="margin-bottom: 1%">
      <h2 class="titre-form text-xs-left">Rechercher un trajet</h2>
      <location-text-field label="Départ" storeProperty="departure"></location-text-field>
      <location-text-field label="Arrivée" storeProperty="arrival"></location-text-field>
      <v-btn v-on:click="clear" color="light-blue white--text">Recommencer</v-btn>
      <v-btn
        color="amber darken-1 white--text"
        v-on:click="submit; if(submit()){clear()}"
        :disabled="!valid"
      >
        Rechercher
      </v-btn>
    </v-form>
    <display-journeys></display-journeys>
  </div>
</template>

<script>
import LocationTextField from '@/components/LocationTextField'
import DisplayJourneys from '@/components/DisplayJourneys'

export default {
  name: 'SelectPLace',
  components: {
    LocationTextField,
    DisplayJourneys
  },
  data: () => ({
    valid: false
  }),
  computed: {
    depart: function () {
      return this.$store.getters.departure
    },
    arrivee: function () {
      return this.$store.getters.arrival
    },
    journeys: function () {
      return this.$store.getters.journeys
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        var monInit = {
          method: 'GET',
          headers: {
            'Authorization': '371613e0-c142-41b2-9c07-ccdaaf89dbb9'
          }
        }

        var urlapi = 'https://api.navitia.io/v1/coverage/fr-se/journeys?from=' + this.depart.id + '&to=' + this.arrivee.id
        var maRequete = new Request(urlapi)
        var that = this

        fetch(maRequete, monInit)
          .then(function (reponse) {
            return reponse.json()
          })
          .then(function (data) {
            that.$store.dispatch('addJourney', data.journeys)
          })

        return true
      }
      return false
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (max-width: 600px){
  button {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin: 6px 0;
    width: 100%;
  }
  button:first-of-type {
    margin-bottom: 18px
  }
}
</style>
