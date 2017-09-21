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
          <h4 class="primary--text mt-2">Avaliações</h4>
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
          <v-layout row wrap class="mt-3">
            <v-flex xs12 sm6 md4 v-for="debtor in debtors" :key="debtor.id" class="mb-2">
              <v-card>
                <v-card-text>
                  <v-layout row>
                    <v-flex xs4 class="text-xs-center">
                      <img 
                        v-if="debtor.reviewIcon === 'stamp'" 
                        src="../../static/black-stamp.png" 
                        height="100px" 
                        class="mt-4">
                      <v-icon 
                        v-else 
                        style="font-size: 100px" 
                        class="mt-4">
                        {{debtor.reviewIcon}}
                      </v-icon>
                    </v-flex>
                    <v-flex xs8>
                      <span class="primary--text headline mb-3">{{debtor.name}}</span>                      
                      <v-list subheader>
                        <v-list-tile-avatar>
                          <v-list-tile-action>
                            <v-icon>event</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>{{debtor.debitDate | date}}</v-list-tile-title>
                          </v-list-tile-content>                          
                        </v-list-tile-avatar>
                        <v-list-tile-avatar>
                          <v-list-tile-action>
                            <v-icon>kitchen</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>{{debtor.paymentDate | date}}</v-list-tile-title>
                          </v-list-tile-content>                          
                        </v-list-tile-avatar>
                        <v-list-tile-avatar>
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
      this.$store.dispatch('getEvaluations')
    },
    computed: {
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