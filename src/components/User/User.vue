<template>
  <v-layout>
    <v-flex xs12>
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
            <v-flex xs12 md6>
              <v-text-field 
                name="email" 
                label="Data Nascimento" 
                prepend-icon="cake"
                id="email" 
                v-model="formatedBirthDate"
                disabled></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field 
                name="contact" 
                label="Data Contrato" 
                prepend-icon="work"
                id="contact" 
                v-model="formatedAdmissionDate"
                disabled></v-text-field>
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
  props: ['id'],
  data () {
    return {
      user: null,
      formatedBirthDate: '',
      formatedAdmissionDate: '',
      defaultImage: '../../../static/profile.png'
    }
  },
  created () {
    this.$store.dispatch('userDetail', {
      id: this.id
    })
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    users () {
      return this.$store.getters.users
    }
  },
  watch: {
    users (value) {
      if (value.length > 0) {
        this.user = value[0]
        this.user.imageUrl = (value[0].imageUrl !== null || value[0].imageUrl !== '') ? value[0].imageUrl : this.defaultImage
        this.formatedBirthDate = DateFilter(this.user.birthDate)
        this.formatedAdmissionDate = DateFilter(this.user.admissionDate)
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
