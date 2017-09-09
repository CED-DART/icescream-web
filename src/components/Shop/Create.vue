<template>
  <v-layout>
    <v-flex xs12>
      <v-layout row v-if="response.message !== null">
        <v-flex xs12 lg10 offset-lg1>
          <app-alert @dismissed="onDismissed" :response="response"></app-alert>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 lg10 offset-lg1>
          <h4 class="primary--text mt-2">Cadastrar Sorveteria</h4>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 lg10 offset-lg1>
          <form @submit.prevent="onCreateShop">
            <v-layout row>
              <v-flex xs12>
                <v-text-field 
                  name="name" 
                  label="Nome" 
                  id="name" 
                  v-model="name"
                  required></v-text-field>
              </v-flex>              
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 md8>
                <v-text-field 
                  name="address" 
                  label="Endereço" 
                  id="address" 
                  v-model="address"
                  prepend-icon="room" 
                  required></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field 
                  name="phone" 
                  label="Telefone" 
                  id="phone" 
                  v-model="phone"
                  placeholder="Ex.: (99) 9999-9999 / (99) 99999-9999" 
                  prepend-icon="phone"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 md8>
                <v-text-field 
                  name="paymentMethods" 
                  label="Formas de Pagamento" 
                  id="paymentMethods" 
                  v-model="paymentMethods"
                  prepend-icon="payment"></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field 
                  name="averagePrice" 
                  label="Média de Preço" 
                  id="averagePrice" 
                  v-model="averagePrice"
                  prepend-icon="local_atm"
                  prefix="R$"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 class="text-xs-center text-sm-right">
                <v-btn 
                  class="secondary"
                  router
                  to="/shops">Voltar</v-btn>
                <v-btn 
                  class="primary"
                  :disabled="!formIsValid || loading"
                  :loading="loading"
                  type="submit">
                  <span slot="loader" class="custom-loader">
                    <v-icon dark>cached</v-icon>
                  </span>
                  Criar
                </v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      address: '',
      phone: '',
      paymentMethods: '',
      averagePrice: '0,00'
    }
  },
  computed: {
    formIsValid () {
      return this.name !== '' &&
        this.address !== ''
    },
    response () {
      return this.$store.getters.response
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onCreateShop () {
      if (!this.formIsValid) {
        return
      }
      alert('')
      const iceCreamShop = {
        name: this.name,
        address: this.address,
        phone: this.phone,
        paymentMethods: this.paymentMethods,
        averagePrice: parseFloat(this.averagePrice.replace(',', '.'))
      }
      this.$store.dispatch('createIceCreamShop', iceCreamShop)
      this.$router.push('/shops')
    },
    onDismissed () {
      this.$store.dispatch('clearResponse')
    }
  }
}
</script>
