<template>
  <v-container>
    <v-layout row v-if="response.message !== null">
      <v-flex xs12>
        <app-alert @dismissed="onDismissed" :response="response" class="mb-4"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 lg10 offset-lg1>
        <v-layout row>
          <v-flex xs12 class="text-xs-center">
            <h3 class="primary--text">Termo de Aceite</h3>
          </v-flex>
        </v-layout>
        <v-layout 
          style="max-height: 500px"
          class="scroll-y mt-4"
          id="scroll-target">
          <v-flex
            class="mt-4"
            v-scroll="{
              target: '#scroll-target',
              callback: onFinishRead
            }">
            <h6>Termo de Aceitação</h6>
            <p>Todo aniversário de vida e de contrato de empresa o participante deve pagar 5 litros de sorvete e também ao início de contrato deve pagar 5 litros de sorvete no primeiro pagamento, torna se inválido o pagamento de qualquer quantidade inferior a essa, os sabores são escolhidos pelo pagante, o mesmo também pode adicionar adendos como cobertura e casquinha.</p>
            <p>Bolo são aceitos em troca do sorvete, sobre tudo passaram pelo avaliador se adequado e compatível.</p>
            <p>Sua imagem será divulgada como devedor de sorvete ao comemorar uma dessas datas, aniversário e contrato de empresa.</p>
            <p>Se concordar em participar não poderá mais sair, enquanto estiver trabalhando na Dart Digital.</p>
            <p>A brincadeira de controle de sorvetes, recentemente nomeada Ice Scream é organizada pelos colaboradores da Dart Digital e não tem vínculo empregatício, nenhuma relação trabalhista, social ou mesmo econômica com a Dart Digital.</p>
          </v-flex>
        </v-layout>
        <v-layout row v-if="!user.acceptedTerms">
          <v-flex xs12>
            <v-checkbox v-model="accepted" dark color="primary" :label="checkboxLabel" class="mt-4"></v-checkbox>
          </v-flex>
        </v-layout>
        <v-layout row v-if="!user.acceptedTerms">
          <v-flex xs12 class="text-xs-right">
            <v-btn 
              class="primary" 
              :disabled="!readed || !accepted"
              :loading="loading"
              @click="onAcceptTerms">
              <span slot="loader" class="custom-loader">
                <v-icon dark>cached</v-icon>
              </span>
              Continuar
            </v-btn>        
          </v-flex>
        </v-layout>
        <v-layout row v-if="user.acceptedTerms">
          <v-flex xs>
            <p class="primary--text mt-4" style="font-size: 1.3em;">Lido e aceito em {{user.acceptedTermsDate | date}}</p>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        checkboxLabel: 'Li e aceito os termos',
        readed: false,
        accepted: false
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
      }
    },
    methods: {
      onFinishRead (e) {
        let scrollHeight = e.target.scrollHeight - e.target.clientHeight
        if (!this.readed && scrollHeight === e.target.scrollTop) {
          this.readed = true
        }
      },
      onAcceptTerms () {
        this.$store.dispatch('acceptTerms', this.user)
          .then(() => {
            this.$router.push('/')
          })
      },
      onDismissed () {
        this.$store.dispatch('clearResponse')
      }
    }
  }
</script>