<template>
  <div id="myAddresses">
    <h1>Mes adresses</h1>

    <address-list v-bind:addresses="addresses"></address-list>
    <add-address v-on:add-address="addAddress"></add-address>

  </div>
</template>

<script>
import AddressList from '@/components/AddressList'
import AddAddress from '@/components/AddAddress'

export default {
  name: 'MyAddresses',
  data: () => ({
    addresses: []
  }),
  components: {
    // Reference to the AddressList component
    AddressList,
    AddAddress
  },
  methods: {
    addAddress: function () {}
  }
}
</script>
