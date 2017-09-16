<template>
  <v-dialog width="350px" persistent v-model="showDialog">
    <v-btn icon small slot="activator" v-tooltip:top="{ html: title }" class="primary--text">
      <v-icon>check</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="headline primary--text">Confirmar Pagamento</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat class="primary--text darken-1" @click="showDialog = false">Close</v-btn>
              <v-btn flat class="primary--text darken-1" @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['title', 'debtor'],
  data () {
    return {
      showDialog: false
    }
  },
  methods: {
    onSaveChanges () {
      // if (this.shop.name.trim() === '' || this.shop.address.trim() === '') {
      //   return
      // }
      // this.shop.averagePrice = parseFloat(this.editedAveragePrice.replace(',', '.'))
      // this.$store.dispatch('updateIceCreamShop', {
      //   idIceCreamShop: this.shop.id,
      //   name: this.shop.name,
      //   address: this.shop.address,
      //   phone: this.shop.phone,
      //   averagePrice: parseFloat(this.editedAveragePrice.replace(',', '.')),
      //   paymentMethods: this.shop.paymentMethods
      // })
      console.log(this.debtor)
      this.showDialog = false
    }
  }
}
</script>
