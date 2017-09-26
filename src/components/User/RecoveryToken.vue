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
                <form @submit.prevent="onSubmit">
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field 
                        name="password" 
                        label="Nova Senha" 
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
                      <v-text-field 
                        name="confirmPassword" 
                        label="Confirmar Senha" 
                        id="confirmPassword"
                        v-model="confirmPassword"
                        :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (showPassword = !showPassword)"
                        class="primary--text"
                        :type="showPassword ? 'text' : 'password'"
                        required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12 class="text-xs-right">
                      <v-btn 
                        type="button" 
                        class="secondary"
                        :disabled="loading"
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
                        Salvar
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
      password: '',
      confirmPassword: '',
      showPassword: false,
      userToken: null
    }
  },
  created () {
    this.$store.dispatch('clearResponse')
    if (this.$route.query.token === undefined) {
      this.$router.push('/')
    }
    this.$store.dispatch('getUserByToken', this.$route.query.token)
      .then((data) => {
        this.userToken = data
      })
      .catch(() => {
        this.$router.push('/')
      })
  },
  computed: {
    response () {
      return this.$store.getters.response
    },
    loading () {
      return this.$store.getters.loading
    },
    validForm () {
      return this.password !== '' && this.confirmPassword !== '' && this.password === this.confirmPassword
    }
  },
  methods: {
    onSubmit () {
      this.userToken.NewPassword = this.password
      this.$store.dispatch('changePasswordUser', this.userToken)
        .then(() => {
          this.$router.push('/login')
        })
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
