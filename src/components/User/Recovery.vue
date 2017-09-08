<template>
  <v-layout>
    <v-flex>
      <v-layout>
        <v-flex xs-12 class="text-xs-center">
          <img src="../../../static/logo.png" alt="IceScreamerLogo" id="icescreamerLogo">
        </v-flex>
      </v-layout>
      <v-layout row v-if="response.message !== null">
        <v-flex xs12 sm6 lg4 offset-sm3 offset-lg4>
          <app-alert @dismissed="onDismissed" :response="response"></app-alert>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 lg4 offset-sm3 offset-lg4>
          <v-card>
            <v-card-text>
              <v-container>
                <form @submit.prevent="onRecovery">
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field 
                        name="email" 
                        label="E-mail" 
                        id="email"
                        v-model="email"
                        type="email"
                        required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12 class="text-xs-right">
                      <v-btn 
                        type="button" 
                        class="secondary"
                        @click="goBack">
                        <v-icon dark left>keyboard_arrow_left</v-icon>
                        Voltar
                      </v-btn>
                      <v-btn 
                        type="submit" 
                        class="primary" 
                        :disabled="!validForm || loading" 
                        :loading="loading">
                        <span slot="loader" class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                        Recuperar
                      </v-btn>                      
                    </v-flex>
                  </v-layout>                
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>    
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      windowWidth: window.innerWidth
    }
  },
  created () {
    this.$store.dispatch('clearResponse')
  },
  computed: {
    response () {
      return this.$store.getters.response
    },
    loading () {
      return this.$store.getters.loading
    },
    validForm () {
      return this.email !== ''
    }
  },
  methods: {
    onRecovery () {
      this.$store.dispatch('recoveryUserPassword', this.email)
      this.email = ''
    },
    goBack () {
      this.$store.dispatch('clearResponse')
      this.$router.push('/login')
    },
    onDismissed () {
      this.$store.dispatch('clearResponse')
    }
  }
}
</script>
