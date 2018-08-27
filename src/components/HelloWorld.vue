<template>
  <div id="hello">
    <h1 class="display-2 mb-2"><span class="light-blue--text">Lyon</span><span class="amber--text text--darken-1">Transit</span></h1>
    <select-place></select-place>
    <div style="height: 15px"></div>
    <lines></lines>
    <address-list v-bind:addresses="addresses"></address-list>
  </div>
</template>

<script>
import AddressList from '@/components/AddressList'
import SelectPlace from '@/components/SelectPlace'
import Lines from '@/components/Lines'

export default {
  name: 'HelloWorld',
  components: {
    AddressList,
    SelectPlace,
    Lines
  },
  data: () => ({
    addresses: []
  }),

  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
