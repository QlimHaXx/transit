<template>
  <div class='addressitem'>
    <v-divider></v-divider>
    <v-list-tile style="margin: 0 0 0 -16px">
      <v-list-tile-content>
        <v-list-tile-title v-html="address.name"></v-list-tile-title>
        <v-list-tile-sub-title v-html="address.address"></v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-tooltip top v-if="$route.name == 'HelloWorld'">
          <v-btn icon ripple v-on:click="changeAddress(address)" slot="activator">
            <v-icon v-if="address.favorite" color="light-blue">check</v-icon>
            <v-icon v-else color="grey lighten-1">check</v-icon>
          </v-btn>
          <span>Définir</span>
        </v-tooltip>
        <v-tooltip top v-else>
          <v-btn icon ripple v-on:click="deleteAddress(address)" slot="activator">
            <v-icon color="grey lighten-1">delete</v-icon>
          </v-btn>
          <span>Supprimer</span>
        </v-tooltip>
      </v-list-tile-action>
    </v-list-tile>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  props: ['address'],
  methods: mapActions([
    'deleteAddress',
    'changeAddress'
  ])
}
</script>
