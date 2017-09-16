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
          <h4 class="primary--text mt-2">Cadastrar Usuário</h4>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 lg10 offset-lg1>
          <form @submit.prevent="onCreateUser">
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
            <v-layout row wrap>
              <v-flex xs12 md6>
                <v-text-field 
                  name="contact" 
                  label="Contato Skype" 
                  id="contact" 
                  v-model="contact"></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
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
                  <v-date-picker v-model="birthDate" locale="pt-BR">
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
                  <v-date-picker v-model="admissionDate" locale="pt-BR">
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
            <v-layout row v-if="imageUrl !== ''">
              <v-flex xs12>
                <img :src="imageUrl" height="210px">
              </v-flex>
            </v-layout>            
            <v-layout row>
              <v-flex xs12>
                <v-text-field 
                  name="photoPerfil" 
                  label="URL Foto Perfil" 
                  id="photoPerfil"
                  prepend-icon="add_a_photo" 
                  v-model="imageUrl"></v-text-field>
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
      email: '',
      contact: '',
      imageUrl: '',
      birthDate: null,
      formatedBirthDate: '',
      admissionDate: null,
      formatedAdmissionDate: '',
      password: '',
      showPassword: false,
      showBirthDateDialog: false,
      showAdmissionDateDialog: false
    }
  },
  computed: {
    formIsValid () {
      return this.name !== '' &&
        this.email !== '' &&
        this.password !== '' &&
        this.birthDate !== null &&
        this.admissionDate !== null
    },
    response () {
      return this.$store.getters.response
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onCreateUser () {
      if (!this.formIsValid) {
        return
      }
      const userData = {
        name: this.name,
        email: this.email,
        birthDate: this.birthDate,
        admissionDate: this.admissionDate,
        contact: this.contact,
        password: this.password,
        imageURL: this.imageUrl
      }
      this.$store.dispatch('createUser', userData)
      this.$router.push('/users')
    },
    setBirthDate () {
      this.showBirthDateDialog = false
      this.formatedBirthDate = this.birthDate.split('-').reverse().join('/')
    },
    setAdmissionDate () {
      this.showAdmissionDateDialog = false
      this.formatedAdmissionDate = this.admissionDate.split('-').reverse().join('/')
    },
    onDismissed () {
      this.$store.dispatch('clearResponse')
    }
  }
}
</script>
