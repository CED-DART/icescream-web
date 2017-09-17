<template>
  <v-layout>
    <v-flex xs12>
      <v-layout row v-if="response.message !== null">
        <v-flex xs12 lg10 offset-lg1>
          <app-alert @dismissed="onDismissed" :response="response"></app-alert>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 lg10 offset-lg1>
          <h3 class="primary--text mt-2 mb-4 text-xs-center">Estamos há {{daysWithoutIceCream}} dias sem sorvete.</h3>
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
      <v-layout v-else row wrap>
        <v-flex xs12 md6>
          <v-card>
            <v-card-text>
              <v-flex xs12 class="text-xs-center">
                <img :src="(debtors[0].imageUrl === undefined || debtors[0].imageUrl === null || debtors[0].imageUrl === '') ? defaultImageUrl : debtors[0].imageUrl" 
                  height="179px" 
                  class="userProfileImage">
              </v-flex>
              <h3 class="primary--text headline mb-3 text-xs-center">{{debtors[0].name}}</h3>
              <v-list subheader>
                <v-list-tile-avatar>
                  <v-list-tile-action>
                    <v-icon>event</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{debtors[0].date | date}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile-avatar>
                <v-list-tile-avatar class="mt-2">
                  <v-list-tile-action>
                    <v-icon>{{debtors[0].reason === 'Contrato' ? 'work' : 'cake'}}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{debtors[0].reason}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile-avatar>
              </v-list>                  
            </v-card-text>
            <v-divider v-if="user.admin"></v-divider>
            <v-card-actions v-if="user.admin">
              <v-spacer></v-spacer>
              <app-confirm-payment-dialog
                title='Confirmar Pagamento'
                :debtor="debtors[0]">
              </app-confirm-payment-dialog>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-layout row wrap>
            <v-flex xs12 v-for="debtor in debtors.slice(1, (debtors.length + 1))" :key="debtor.id" class="mb-2">
              <v-card>
                <v-card-text>
                  <v-layout row>
                    <v-flex xs4 class="text-xs-center">
                      <img :src="(debtor.imageUrl === undefined || debtor.imageUrl === null || debtor.imageUrl === '') ? defaultImageUrl : debtor.imageUrl" 
                        height="130px" 
                        class="userProfileImage mt-2">
                    </v-flex>
                    <v-flex xs8>
                      <span class="primary--text headline mb-3">{{debtor.name}}</span>
                      <v-list subheader>
                        <v-list-tile-avatar>
                          <v-list-tile-action>
                            <v-icon>event</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>{{debtor.date | date}}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile-avatar>
                        <v-list-tile-avatar class="mt-2">
                          <v-list-tile-action>
                            <v-icon>{{debtor.reason === 'Contrato' ? 'work' : 'cake'}}</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>{{debtor.reason}}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile-avatar>
                      </v-list>
                    </v-flex>
                  </v-layout>                                    
                </v-card-text>
                <v-divider v-if="user.admin"></v-divider>
                <v-card-actions v-if="user.admin">
                  <v-spacer></v-spacer>
                  <app-confirm-payment-dialog
                    title='Confirmar Pagamento'
                    :debtor="debtor">
                  </app-confirm-payment-dialog>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>          
        </v-flex>
        <v-flex xs12>
          <v-btn block 
            primary 
            dark
            large
            router 
            to="/debtors">
          Ver Todos</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      debtors: null,
      daysWithoutIceCream: 0,
      defaultImageUrl: '../../static/profile.png'
    }
  },
  created () {
    this.$store.dispatch('loadUserDebtors', 3)
    this.$store.dispatch('getLastPaymentDate')
      .then(() => {
        const currentDate = new Date()
        const lastPaymentDate = new Date(this.$store.getters.lastPaymentDate)
        const timeDiff = Math.abs(currentDate.getTime() - lastPaymentDate.getTime())
        this.daysWithoutIceCream = Math.ceil(timeDiff / (1000 * 3600 * 24))
      })
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    debtorsList () {
      return this.$store.getters.debtors
    },
    loading () {
      return this.$store.getters.loading
    },
    response () {
      return this.$store.getters.response
    }
  },
  watch: {
    debtorsList (value) {
      if (value !== null && value !== undefined) {
        this.debtors = value
      }
    }
  }
}
</script>

<style scoped>
.userProfileImage {
  background-color: white;
  border-radius: 110px;
}
</style>