<template>
  <div class="lignes text-xs-left">
    <h2>Lignes</h2>
    <v-btn
      :loading="loading"
      :disabled="loading"
      color="light-blue"
      class="white--text ml-0"
      @click.native="loadLines()"
    >
      <v-icon left dark>directions_bus</v-icon>
      Lignes TCL
    </v-btn>
    <h2>Capacités du dispositif</h2>
    <v-btn
      color="pink"
      class="ml-0"
      dark
      @click="dialog3 = true"
    >
      <v-icon left dark>phonelink_setup</v-icon>
      Modernizr
    </v-btn>
    <v-dialog
      v-model="dialog3"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline pink white--text"
          primary-title
        >
          Capacités
        </v-card-title>

        <v-card-text>
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Geolocation API</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color="pink" v-if="geolocation">check</v-icon>
                <v-icon color="grey lighten-1" v-else>block</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Orientation and Motion Events</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color="pink" v-if="deviceorientation && devicemotion">check</v-icon>
                <v-icon color="grey lighten-1" v-else>block</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>DOM Pointer Events API</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color="pink" v-if="pointerevents">check</v-icon>
                <v-icon color="grey lighten-1" v-else>block</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Local Storage</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color="pink" v-if="localstorage">check</v-icon>
                <v-icon color="grey lighten-1" v-else>block</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Vibration API</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color="pink" v-if="vibrate">check</v-icon>
                <v-icon color="grey lighten-1" v-else>block</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Canvas</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color="pink" v-if="canvas">check</v-icon>
                <v-icon color="grey lighten-1" v-else>block</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Battery API</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color="pink" v-if="batteryapi">check</v-icon>
                <v-icon color="grey lighten-1" v-else>block</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog3 = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark class="light-blue">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Lignes TCL</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="mb-5">
          <v-list two-line>
            <template v-for="(item, index, index2) in lines.lines">
              <v-list-tile :key="index">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.code }}, {{ item.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ item.id }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-tooltip top v-if="isInLocalStorage(item.id)">
                    <v-btn icon ripple @click.native="loadInfoLineFromLocalStorage(item.id, item.code, item.name)" slot="activator">
                      <v-icon color="amber darken-1">cloud_download</v-icon>
                    </v-btn>
                    <span>Déjà Téléchargé</span>
                  </v-tooltip>
                  <v-tooltip top v-else>
                    <v-btn icon ripple @click.native="loadInfoLine(item.id, item.code, item.name)" slot="activator">
                      <v-icon color="grey lighten-1">cloud_download</v-icon>
                    </v-btn>
                    <span>Télécharger</span>
                  </v-tooltip>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider :key="index2"></v-divider>
            </template>
          </v-list>
        </v-card-text>
        <v-layout row text-xs-center style="position: absolute;bottom: 0;width: 100%;background: #FFF;">
          <v-flex xs6>
            <v-btn flat @click.native="loadPageLine('prev')" :disabled="prev_disabled">
              <v-icon left dark>arrow_back</v-icon>
              Précedente
            </v-btn>
          </v-flex>
          <v-flex xs6>
            <v-btn flat @click.native="loadPageLine('next')" :disabled="next_disabled">
              Suivante
              <v-icon right dark>arrow_forward</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-toolbar card dark class="amber darken-1">
          <v-btn icon dark @click.native="dialog2 = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ line_code }}, {{ line_name }}</v-toolbar-title>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(item, index, index2) in stops">
            <v-list-tile :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.stop_point.name }}</v-list-tile-title>
                <v-list-tile-sub-title></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :key="index2"></v-divider>
          </template>
        </v-list>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="dialog2=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import modernizr from 'modernizr'

export default {
  name: 'Lines',
  components: {
  },
  data: () => ({
    dialog: false,
    dialog2: false,
    dialog3: false,
    loading: false,
    lines_number: 0,
    line_name: null,
    line_code: null,
    prev_disabled: true,
    next_disabled: false,
    page: 0,
    canvas: false,
    geolocation: false,
    devicemotion: false,
    deviceorientation: false,
    pointerevents: false,
    localstorage: false,
    vibrate: false,
    batteryapi: false
  }),
  created: function () {
    if (modernizr.canvas) {
      this.canvas = true
    }
    if (modernizr.deviceorientation) {
      this.deviceorientation = true
    }
    if (modernizr.devicemotion) {
      this.devicemotion = true
    }
    if (modernizr.geolocation) {
      this.geolocation = true
    }
    if (modernizr.pointerevents) {
      this.pointerevents = true
    }
    if (modernizr.localstorage) {
      this.localstorage = true
    }
    if (modernizr.vibrate) {
      this.vibrate = true
    }
    if (modernizr.batteryapi) {
      this.batteryapi = true
    }
  },
  computed: {
    lines: function () {
      return this.$store.getters.lines
    },
    stops: function () {
      return this.$store.getters.stops
    }
  },
  methods: {
    loadLines () {
      this.loading = true

      var monInit = {
        method: 'GET',
        headers: {
          'Authorization': '371613e0-c142-41b2-9c07-ccdaaf89dbb9'
        }
      }

      var urlapi = 'https://api.navitia.io/v1/coverage/fr-se/networks/network:tcl/lines?'
      var maRequete = new Request(urlapi)
      var that = this

      fetch(maRequete, monInit)
        .then(function (reponse) {
          return reponse.json()
        })
        .then(function (data) {
          that.$store.dispatch('addLine', data)
          that.lines_number = parseInt(data.pagination.total_result / data.pagination.items_per_page, 10)
          that.dialog = true
          that.loading = false
        })
    },
    loadPageLine (val) {
      if (val === 'next') {
        this.page++
      }
      if (val === 'prev') {
        this.page--
      }
      if (this.page === 0) {
        this.prev_disabled = true
      } else {
        this.prev_disabled = false
      }
      if (this.page === this.lines_number) {
        this.next_disabled = true
      } else {
        this.next_disabled = false
      }
      if (this.page < 0) {
        this.page = 0
        return
      }
      if (this.page > this.lines_number) {
        this.page = this.lines_number
        return
      }
      var monInit = {
        method: 'GET',
        headers: {
          'Authorization': '371613e0-c142-41b2-9c07-ccdaaf89dbb9'
        }
      }

      var urlapi = 'https://api.navitia.io/v1/coverage/fr-se/networks/network:tcl/lines?start_page=' + this.page
      var maRequete = new Request(urlapi)
      var that = this

      fetch(maRequete, monInit)
        .then(function (reponse) {
          return reponse.json()
        })
        .then(function (data) {
          that.$store.dispatch('addLine', data)
        })
    },
    loadInfoLine (id, code, name) {
      var monInit = {
        method: 'GET',
        headers: {
          'Authorization': '371613e0-c142-41b2-9c07-ccdaaf89dbb9'
        }
      }
      var urlapi = 'https://api.navitia.io/v1/coverage/fr-se/lines/' + id + '/route_schedules?from_datetime=20180722T120000&items_per_schedule=25'
      var maRequete = new Request(urlapi)
      var that = this

      fetch(maRequete, monInit)
        .then(function (reponse) {
          return reponse.json()
        })
        .then(function (data) {
          that.$store.dispatch('addStops', data.route_schedules[0].table.rows)
          localStorage.setItem(id, JSON.stringify(data.route_schedules[0].table.rows))
          that.line_code = code
          that.line_name = name
          that.dialog2 = true
        })
    },
    loadInfoLineFromLocalStorage (id, code, name) {
      console.log('pas de requete')
      this.$store.dispatch('addStops', JSON.parse(localStorage.getItem(id)))
      this.line_code = code
      this.line_name = name
      this.dialog2 = true
    },
    isInLocalStorage (id) {
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === id) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (max-width: 600px){
  button.ml-0 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin: 6px 0;
    width: 100%;
  }
  button.ml-0:first-of-type {
    margin-bottom: 18px
  }
}
</style>
