<template>
  <div>
    <v-layout row align-center>
      <v-flex class="champs">
        <v-select
          item-text="name"
          v-bind:label="label"
          autocomplete
          v-bind:loading="loading"
          v-bind:items="itemsSelect"
          v-bind:search-input.sync="search"
          v-model="select"
          required
          v-on:blur="loading = false"
          :rules="inputRules"
          clearable
        >
          <template slot="selection" slot-scope="data">
            <span class="black--text">{{ data.item.name }}</span>
          </template>
          <template slot="item" slot-scope="data">
            <div class="black--text">{{ data.item.name }}</div>
          </template>
        </v-select>
      </v-flex>
      <v-flex class="bouton">
        <v-tooltip top>
          <v-icon v-on:click="locateMe()" left slot="activator" :class="{color: this.color}">place</v-icon>
          <span>Me géolocaliser</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import modernizr from 'modernizr'

export default {
  name: 'SelectPLace',
  props: ['label', 'storeProperty'],
  components: {
    modernizr
  },
  data: () => ({
    color: null,
    search: null,
    loading: false,
    inputRules: [
      v => !!v || 'Le champs est requis'
    ],
    itemsSelect: []
  }),
  created: function () {
    if (modernizr.geolocation) {
      // console.log('oui')
      // navigator.geolocation.getCurrentPosition(function (position) {
      //   console.log(position.coords.longitude + ';' + position.coords.latitude)
      // })
    }
  },
  computed: {
    select: {
      get () {
        return this.$store.getters[this.storeProperty]
      },
      set (v) {
        this.$store.dispatch(this.storeProperty, v)
      }
    }
  },
  methods: {
    locateMe () {
      var that = this
      navigator.geolocation.getCurrentPosition(function (position) {
        var select = {}
        select['id'] = position.coords.longitude + ';' + position.coords.latitude
        that.$store.dispatch(that.storeProperty, select)
        that.color = 'red'
      })
    },
    querySelections (val) {
      this.loading = 'amber darken-1'
      var that = this

      var monInit = {
        method: 'GET',
        headers: {
          'Authorization': '371613e0-c142-41b2-9c07-ccdaaf89dbb9'
        }
      }

      var urlapi = 'https://api.navitia.io/v1/coverage/fr-se/places?q=' + val
      var maRequete = new Request(urlapi)

      fetch(maRequete, monInit)
        .then(function (reponse) {
          return reponse.json()
        })
        .then(function (data) {
          that.loading = false
          that.itemsSelect = data.places
          return true
        })
      return false
    }
  },
  watch: {
    search (val) {
      // val est la valeur du champ texte
      // if (val !== '') {
      val && this.querySelections(val)
      // }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.champs {
  width: 90%;
}
.bouton {
  width: 10%;
}
.bouton *{
  font-size: 30px
}
.bouton:hover {
  cursor: pointer;
}
.bouton:hover *{
  color: #06F;
}
</style>
