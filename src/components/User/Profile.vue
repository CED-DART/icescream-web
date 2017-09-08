<template>
  <v-layout>
    <v-flex xs12>
      <v-layout row v-if="response.message !== null">
        <v-flex xs12 sm8 offset-sm2 class="mb-4">
          <app-alert @dismissed="onDismissed" :response="response"></app-alert>
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
      <v-layout v-else>
        <v-flex xs12 sm8 offset-sm2>
          <v-layout row v-if="user.imageUrl !== null">
            <v-flex xs12 class="text-xs-center">
              <img :src="user.imageUrl" height="210px" class="userProfileImage">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 class="text-xs-center">
              <h4 class="primary--text mt-3">{{user.name}}</h4>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 md9>
              <v-text-field 
                name="email" 
                label="E-mail" 
                id="email" 
                v-model="user.email"
                disabled></v-text-field>
            </v-flex>
            <v-flex xs12 md3>
              <v-text-field 
                name="contact" 
                label="Contato Skype" 
                id="contact" 
                v-model="user.contact"
                disabled></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field 
                name="email" 
                label="Data Nascimento" 
                prepend-icon="cake"
                id="email" 
                v-model="formatedBirthDate"
                disabled></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field 
                name="contact" 
                label="Data Contrato" 
                prepend-icon="work"
                id="contact" 
                v-model="formatedAdmissionDate"
                disabled></v-text-field>
            </v-flex>
          </v-layout>
          <form @submit.prevent="onChangePassword">
            <v-layout>
              <v-flex xs12>
                <h5 class="headline primary--text my-3">Alterar Senha</h5>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 md4>
                <v-text-field 
                  name="password" 
                  label="Senha Atual" 
                  id="password"
                  v-model="currentPassword"
                  :append-icon="showCurrentPassword ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (showCurrentPassword = !showCurrentPassword)"
                  class="primary--text"
                  :type="showCurrentPassword ? 'text' : 'password'"></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field 
                  name="password" 
                  label="Nova Senha" 
                  id="password"
                  v-model="newPassword"
                  :append-icon="showNewPassword ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (showNewPassword = !showNewPassword)"
                  class="primary--text"
                  :type="showNewPassword ? 'text' : 'password'"></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field 
                  name="password" 
                  label="Confirmar Nova Senha" 
                  id="password"
                  v-model="confirmedNewPassword"
                  :append-icon="showNewPassword ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (showNewPassword = !showNewPassword)"
                  class="primary--text"
                  :type="showNewPassword ? 'text' : 'password'"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 class="text-xs-center text-sm-right">
                <v-btn 
                  class="primary"
                  :disabled="!formIsValid || posting"
                  :loading="posting"
                  type="submit">
                  <span slot="loader" class="custom-loader">
                    <v-icon dark>cached</v-icon>
                  </span>
                  Alterar
                </v-btn>
              </v-flex>
            </v-layout>
          </form>
          <v-layout>
            <v-flex xs12 class="mt-3">
              <router-link to="/terms" style="cursor: pointer;">Visualizar Termo de Aceite</router-link>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import DateFilter from '../../filters/date'

export default {
  data () {
    return {
      defaultImageUrl: 'https://www.gcfaprendelivre.org/files/personage/image/11/R_p.png',
      formatedBirthDate: '',
      formatedAdmissionDate: '',
      currentPassword: '',
      newPassword: '',
      confirmedNewPassword: '',
      showCurrentPassword: false,
      showNewPassword: false,
      posting: false
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    response () {
      return this.$store.getters.response
    },
    user () {
      const storedUser = this.$store.getters.user
      storedUser.imageUrl = storedUser.imageUrl !== undefined ? storedUser.imageUrl : this.defaultImageUrl
      this.formatedBirthDate = DateFilter(storedUser.birthDate)
      this.formatedAdmissionDate = DateFilter(storedUser.admissionDate)
      return storedUser
    },
    formIsValid () {
      return this.currentPassword !== '' &&
        this.newPassword !== '' &&
        this.confirmedNewPassword !== '' &&
        this.confirmedNewPassword === this.newPassword
    }
  },
  methods: {
    onChangePassword () {
      if (!this.formIsValid) {
        return
      }
      this.posting = true
      this.$store.dispatch('changePasswordUser', {
        idUser: this.user.id,
        password: this.currentPassword,
        newPassword: this.newPassword
      })
      .then(() => {
        this.posting = false
      })
    },
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
