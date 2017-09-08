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
                  <form @submit.prevent="onLogin">
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
                      <v-flex xs12>
                        <v-text-field 
                          name="password" 
                          label="Senha" 
                          id="password"
                          v-model="password"
                          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                          :append-icon-cb="() => (showPassword = !showPassword)"
                          class="primary--text"
                          :type="showPassword ? 'text' : 'password'"
                          required></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <router-link to="/recovery" style="cursor: pointer;">Não lembra sua senha?</router-link>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12 class="text-xs-right">
                        <v-btn 
                          type="submit" 
                          class="primary" 
                          :disabled="!validForm || loading" 
                          :loading="loading">
                          <span slot="loader" class="custom-loader">
                            <v-icon dark>cached</v-icon>
                          </span>
                          Entrar
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
      password: '',
      showPassword: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    response () {
      return this.$store.getters.response
    },
    loading () {
      return this.$store.getters.loading
    },
    validForm () {
      return this.email !== '' && this.password !== ''
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onLogin () {
      this.$store.dispatch('logUserIn', {email: this.email, password: this.password})
    },
    onDismissed () {
      this.$store.dispatch('clearResponse')
    }
  }
}
</script>
