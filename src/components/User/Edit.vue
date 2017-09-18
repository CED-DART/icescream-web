<template>
  <v-layout>
    <v-flex xs12>
      <v-layout row v-if="response.message !== null">
        <v-flex xs12 md10 offset-md1>
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
        <v-flex xs12 md10 offset-md1>
          <v-layout row>
            <v-flex xs12>
              <h4 class="primary--text mt-3">Editar Usuário</h4>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 class="text-xs-center">
              <img :src="(editedImageUrl === '' || editedImageUrl === null) ? defaultImageUrl : editedImageUrl" height="210px" class="userProfileImage">
            </v-flex>
          </v-layout>
          <form @submit.prevent="onEditUser">
            <v-layout row>
              <v-flex xs12>
                <v-text-field 
                  name="name" 
                  label="Nome" 
                  id="name" 
                  v-model="editedName"
                  required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 md9>
                <v-text-field 
                  name="email" 
                  label="E-mail" 
                  id="email" 
                  v-model="editedEmail"
                  required></v-text-field>
              </v-flex>
              <v-flex xs12 md3>
                <v-text-field 
                  name="contact" 
                  label="Contato Skype" 
                  id="contact" 
                  v-model="editedContact"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 md6>
                <v-dialog
                  persistent
                  lazy
                  full-width
                  v-model="showBirthDateDialog">
                  <v-text-field
                    slot="activator"
                    label="Data Nascimento"
                    v-model="formatedBirthDate"
                    prepend-icon="cake"
                    readonly                    
                    required
                  ></v-text-field>
                  <v-date-picker v-model="editedBirthDate" locale="pt-BR">
                    <template scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat primary @click="cancel()">Fechar</v-btn>
                        <v-btn flat primary @click="setBirthDate">Selecionar</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 md6>
                <v-dialog
                  persistent
                  lazy
                  full-width
                  v-model="showAdmissionDateDialog">
                  <v-text-field
                    slot="activator"
                    label="Data Contrato"
                    v-model="formatedAdmissionDate"
                    prepend-icon="work"
                    readonly                    
                    required
                  ></v-text-field>
                  <v-date-picker v-model="editedAdmissionDate" locale="pt-BR">
                    <template scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat primary @click="cancel()">Fechar</v-btn>
                        <v-btn flat primary @click="setAdmissionDate">Selecionar</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 md8>
                <v-text-field 
                  name="photoPerfil" 
                  label="URL Foto Perfil" 
                  id="photoPerfil"
                  prepend-icon="add_a_photo" 
                  v-model="editedImageUrl"></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field 
                  name="password" 
                  label="Nova Senha" 
                  id="password"
                  v-model="newPassword"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (showPassword = !showPassword)"
                  class="primary--text"
                  :type="showPassword ? 'text' : 'password'"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-checkbox v-model="editedAdmin" dark color="primary" label="Administrador"></v-checkbox>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 class="text-xs-center text-sm-right">
                <v-btn 
                  class="secondary"
                  router
                  to="/users">Voltar</v-btn>
                <v-btn 
                  class="primary"
                  :disabled="!formIsValid || posting"
                  :loading="posting"
                  type="submit">
                  <span slot="loader" class="custom-loader">
                    <v-icon dark>cached</v-icon>
                  </span>
                  Salvar
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
import moment from 'moment'

export default {
  props: ['id'],
  data () {
    return {
      defaultImageUrl: '../../../static/profile.png',
      editedImageUrl: '',
      editedName: '',
      editedEmail: '',
      editedContact: '',
      editedBirthDate: '',
      editedAdmissionDate: '',
      newPassword: '',
      formatedBirthDate: '',
      formatedAdmissionDate: '',
      editedAdmin: false,
      showBirthDateDialog: false,
      showAdmissionDateDialog: false,
      showPassword: false,
      posting: false
    }
  },
  created () {
    this.$store.dispatch('userDetail', {
      id: this.id
    })
  },
  computed: {
    response () {
      return this.$store.getters.response
    },
    loading () {
      return this.$store.getters.loading
    },
    users () {
      return this.$store.getters.users
    },
    formIsValid () {
      return this.editedName !== '' &&
        this.editedEmail !== '' &&
        this.editedBirthDate !== null &&
        this.editedAdmissionDate !== null
    }
  },
  watch: {
    users (value) {
      if (value.length > 0) {
        this.editedName = value[0].name
        this.editedEmail = value[0].email
        this.editedContact = value[0].contact
        this.editedBirthDate = value[0].birthDate
        this.editedAdmissionDate = value[0].admissionDate
        this.editedImageUrl = value[0].imageUrl
        this.editedAdmin = value[0].admin
        this.formatedBirthDate = moment(this.editedBirthDate).format('DD/MM/YYYY')
        this.formatedAdmissionDate = moment(this.editedAdmissionDate).format('DD/MM/YYYY')
      }
    }
  },
  methods: {
    onEditUser () {
      if (!this.formIsValid) {
        return
      }
      this.posting = true
      this.$store.dispatch('updateUser', {
        idUser: this.id,
        name: this.editedName,
        email: this.editedEmail,
        birthDate: moment(this.editedBirthDate).format('YYYY-MM-DDTHH:mm:ss'),
        admissionDate: moment(this.editedAdmissionDate).format('YYYY-MM-DDTHH:mm:ss'),
        contact: this.editedContact,
        password: this.newPassword,
        imageURL: this.editedImageUrl
      })
      .then(() => {
        this.posting = false
        this.newPassword = ''
      })
    },
    setBirthDate () {
      this.showBirthDateDialog = false
      this.formatedBirthDate = this.editedBirthDate.split('-').reverse().join('/')
    },
    setAdmissionDate () {
      this.showAdmissionDateDialog = false
      this.formatedAdmissionDate = this.editedAdmissionDate.split('-').reverse().join('/')
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

.userProfileImage:hover {
  opacity: 0.2;
  cursor: pointer;
}
</style>