<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <h2 class="titre-form">Ajouter une adresse</h2>
    <v-text-field
      label="Nom"
      v-model="name"
      :rules="nameRules"
      required
    ></v-text-field>
    <v-text-field
      label="Adresse"
      v-model="address"
      :rules="addressRules"
      required
    ></v-text-field>

    <v-btn color="light-blue white--text"
      v-on:click="submit(); if(submit()){addAddress({name:name, address:address, favorite:false}), clear()}"
      :disabled="!valid"
    >
      Ajouter
    </v-btn>
    <v-btn color="amber white--text" v-on:click="clear">Recommencer</v-btn>
  </v-form>
</template>

<script type = "text/javascript" >
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  data: () => ({
    valid: false,
    name: null,
    nameRules: [
      v => !!v || 'Le nom est requis'
    ],
    address: null,
    addressRules: [
      v => !!v || 'L\'adresse est requise'
    ]
  }),
  methods: {
    ...mapActions(['addAddress']),
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('/api/submit', {
          name: this.name,
          address: this.address
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
<style>
</style>
