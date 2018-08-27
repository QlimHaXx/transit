<template>
  <div class="addresslist">
    <v-list two-line>
      <v-subheader class="px-0" v-if="$route.name == 'HelloWorld'"><h2 class="black--text">Mes adresses</h2></v-subheader>
      <v-subheader class="px-0">Nombre d'adresses : {{ sizeAddress }}</v-subheader>
      <address-item v-for="(address,index) in addresses" :key="index" v-bind:address="address"></address-item>
    </v-list>
  </div>
</template>

<script type = "text/javascript" >
import AddressItem from './AddressItem'

export default {
  components: {
    AddressItem
  },
  computed: {
    addresses: function () {
      return this.$store.getters.addresses
    },
    sizeAddress: function () {
      return this.$store.getters.addresses.length
    }
  }
}
</script>
