<template>
  <v-layout>
    <v-flex xs12>
      <v-layout row v-if="response.message !== null">
        <v-flex xs12>
          <app-alert @dismissed="onDismissed" :response="response"></app-alert>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 lg10 offset-lg1>
          <h4 class="primary--text mt-2">Sorveterias</h4>
        </v-flex>        
      </v-layout>
      <v-layout v-if="loading" row wrap>
          <v-flex xs12 class="mt-2 text-xs-center">
              <v-progress-circular 
              indeterminate 
              v-bind:size="70" 
              v-bind:width="7" 
              class="primary--text"></v-progress-circular>
          </v-flex>
      </v-layout>
      <v-layout row v-else>
        <v-flex xs12 lg10 offset-lg1>
          <v-layout row>
            <v-flex xs12>
              <v-btn fab dark small class="primary" v-if="user.admin" router to="/shops/new" v-tooltip:right="{ html: 'Cadastrar Sorveteria' }">
                <v-icon dark>add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="mt-3">
            <v-flex xs12 sm6 md4 v-for="shop in shops" :key="shop.id" class="mb-2">
              <v-card>
                <v-card-text>
                  <h3 class="primary--text headline mb-3 text-xs-center">{{shop.name}}</h3>
                  <v-list two-line subheader>
                    <v-list-tile-avatar>
                      <v-list-tile-action>
                        <v-icon>room</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{shop.address}}</v-list-tile-title>
                        <v-list-tile-sub-title>Endereço</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile-avatar>
                    <v-list-tile-avatar class="mt-2">
                      <v-list-tile-action>
                        <v-icon>phone</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{shop.phone | phone}}</v-list-tile-title>
                        <v-list-tile-sub-title>Telefone</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile-avatar>
                    <v-list-tile-avatar class="mt-2">
                      <v-list-tile-action>
                        <v-icon>payment</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{shop.paymentMethods}}</v-list-tile-title>
                        <v-list-tile-sub-title>Formas de Pagamento</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile-avatar>
                    <v-list-tile-avatar class="mt-2">
                      <v-list-tile-action>
                        <v-icon>local_atm</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{shop.averagePrice | money}}</v-list-tile-title>
                        <v-list-tile-sub-title>Média de Preço</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile-avatar>
                  </v-list>                  
                </v-card-text>
                <v-divider v-if="!user.admin"></v-divider>
                <v-card-actions v-if="!user.admin">
                  <v-spacer></v-spacer>
                  <app-edit-dialog :shop="shop"></app-edit-dialog>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import EditDialog from './Edit.vue'

  export default {
    data () {
      return {
        shops: [],
        showDialog: false
      }
    },
    components: {
      AppEditDialog: EditDialog
    },
    created () {
      this.$store.dispatch('loadIceCreamShops')
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      },
      response () {
        return this.$store.getters.response
      },
      items () {
        return this.$store.getters.shops
      }
    },
    watch: {
      items (value) {
        this.shops = value
      }
    },
    methods: {
      onDismissed () {
        this.$store.dispatch('clearResponse')
      }
    }
  }
</script>
