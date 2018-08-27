<template>
  <div class="display-journeys">
    <p v-if="journeys" class="text-xs-left">Nombre de trajets trouvés : {{journeys.length}}</p>
    <div v-for="(items, index) in journeys" :key="index">
      <v-layout row wrap pa-2 class="amber darken-1 white--text">
        <v-flex xs4>Départ le {{convertToDate(items.departure_date_time)}}</v-flex>
        <v-flex xs4>Arrivée le {{convertToDate(items.arrival_date_time)}}</v-flex>
        <v-flex xs4>Soit {{convertToHour(items.duration)}}</v-flex>
      </v-layout>
      <v-list two-line>
        <template v-for="(item, index, index2) in items.sections">
          <v-layout row wrap :key="index2">
            <v-flex xs3 pa-2>
              <h4>Départ le {{convertToDate(item.departure_date_time)}}</h4>
              <h4>Arrivée le {{convertToDate(item.arrival_date_time)}}</h4>
            </v-flex>
            <v-flex xs7>
              <v-layout row wrap pa-2 v-if="item.type == 'public_transport'">
                <v-flex xs12>
                  <v-layout row wrap v-if="item.display_informations.code != ''">
                    <v-flex xs12>{{item.display_informations.commercial_mode}} : {{item.display_informations.code}}</v-flex>
                    <v-flex xs12>Direction : {{item.display_informations.direction}}</v-flex>
                  </v-layout>
                  <v-layout row wrap v-if="item.display_informations.commercial_mode == 'LocalTrain'">
                    <v-flex xs12><v-icon>train</v-icon> Train</v-flex>
                    <v-flex xs12>Direction : {{item.display_informations.direction}}</v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout row wrap pa-2 v-if="item.type == 'waiting'">
                <v-flex xs12>
                  <v-layout row wrap>
                    <v-flex xs12><v-icon>query_builder</v-icon> Attente</v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout row wrap pa-2 v-if="item.type == 'street_network'">
                <v-flex xs12>
                  <v-layout row wrap>
                    <v-flex xs12><v-icon>directions_walk</v-icon> Rejoindre</v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout row wrap pa-2 v-if="item.type == 'transfer'">
                <v-flex xs12>
                  <v-layout row wrap>
                    <v-flex xs12><v-icon>directions_walk</v-icon> Correspondance</v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout row wrap pa-2>
                <v-flex xs12 v-if="item.from">{{item.from.name}}<v-icon>arrow_right_alt</v-icon>{{item.to.name}}</v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs2 text-xs-right pa-2>durée : {{convertToHour(item.duration)}}</v-flex>
          </v-layout>
          <v-divider :key="index"></v-divider>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    journeys: function () {
      return this.$store.getters.journeys
    }
  },
  methods: {
    convertToHour (seconds) {
      // multiply by 1000 because Date() requires miliseconds
      var date = new Date(seconds * 1000)
      var hh = date.getUTCHours()
      var mm = date.getUTCMinutes()
      var ss = date.getSeconds()
      // If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
      // if (hh > 12) {hh = hh % 12;}
      // These lines ensure you have two-digits
      if (hh < 10) { hh = '0' + hh }
      if (mm < 10) { mm = '0' + mm }
      if (ss < 10) { ss = '0' + ss }
      // This formats your string to HH:MM:SS
      var t = hh + 'h' + mm + 'min'
      return t
    },
    convertToDate (dateFormat) {
      var annee = dateFormat.slice(0, 4)
      var mois = dateFormat.slice(4, 6)
      var jour = dateFormat.slice(6, 8)
      var heure = dateFormat.slice(9, 11)
      var minute = dateFormat.slice(11, 13)

      return jour + '/' + mois + '/' + annee + ' à ' + heure + 'h' + minute
    }
  }
}
</script>
<style scoped>
  h4 {
    font-weight: 400
  }
</style>
