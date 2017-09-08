<template>
  <v-dialog width="350px" persistent v-model="showDialog">
    <v-btn icon slot="activator" v-tooltip:top="{ html: title }" class="primary--text">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="headline primary--text">{{title}}</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field 
                name="name" 
                label="Nome"
                v-model="editedName" 
                id="name"
                required></v-text-field>
              <v-text-field 
                name="address"
                label="Endereço"
                v-model="editedAddress"
                id="address"
                required></v-text-field>
              <v-text-field 
                name="phone" 
                label="Telefone"
                v-model="editedPhone" 
                id="phone"></v-text-field>
              <v-text-field 
                name="paymentMethods" 
                label="Formas de Pagamento"
                v-model="editedPaymentMethods" 
                id="paymentMethods"></v-text-field>
              <v-text-field 
                name="averagePrice" 
                label="Média de Preço"
                v-model="editedAveragePrice" 
                prefix="R$" 
                id="averagePricetitle"></v-text-field>
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
  props: ['shop'],
  data () {
    return {
      showDialog: false,
      title: 'Editar Sorveteria',
      editedName: this.shop.name,
      editedAddress: this.shop.address,
      editedPhone: this.shop.phone,
      editedPaymentMethods: this.shop.paymentMethods,
      editedAveragePrice: this.shop.averagePrice !== null ? parseFloat(this.shop.averagePrice).toFixed(2).replace(',', '').replace('.', ',') : '0,00'
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedName.trim() === '' || this.editedAddress.trim() === '') {
        return
      }
      this.shop.name = this.editedName
      this.shop.address = this.editedAddress
      this.shop.phone = this.editedPhone
      this.shop.paymentMethods = this.editedPaymentMethods
      this.shop.averagePrice = parseFloat(this.editedAveragePrice.replace(',', '.'))
      this.$store.dispatch('updateIceCreamShop', this.shop)
      this.showDialog = false
    }
  }
}
</script>
