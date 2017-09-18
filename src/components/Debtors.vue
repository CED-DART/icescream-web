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
          <h4 class="primary--text mt-2">Devedores</h4>
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
              <v-btn fab dark small class="primary" v-if="user.admin" @click.prevent="onRunScript" v-tooltip:right="{ html: 'Rodar Script de Devedores' }">
                <v-icon dark>settings_backup_restore</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="mt-3">
            <v-flex xs12 sm6 md4 lg3 v-for="debtor in debtors" :key="debtor.id" class="mb-2">
              <v-card>
                <v-card-text>
                  <v-layout row>
                    <v-flex xs4 class="text-xs-center">
                      <img :src="debtor.imageUrl === null || debtor.imageUrl === '' || debtor.imageUrl === undefined ? defaultImageUrl : debtor.imageUrl" height="100px" class="userProfileImage mt-2">
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
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        defaultImageUrl: '../../static/profile.png',
        debtors: []
      }
    },
    created () {
      this.$store.dispatch('loadUserDebtors')
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
        return this.$store.getters.debtors
      }
    },
    watch: {
      items (value) {
        this.debtors = value
      }
    },
    methods: {
      onDismissed () {
        this.$store.dispatch('clearResponse')
      },
      onRunScript () {
        this.$store.dispatch('createPendingDebtors')
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