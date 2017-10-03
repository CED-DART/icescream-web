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
            <h5>Política de Uso e Termo de Aceite</h5>
            <p>A brincadeira de controle de sorvetes, o IceScream, é organizada, desenvolvida e administrada pelos participantes ativos do <b class="primary--text">CED – Centro de Estudos Dart</b>, tendo caráter educacional e de desenvolvimento pessoal, sendo assim, não possui vínculo empregatício, nenhuma relação trabalhista, social ou mesmo econômica com a Dart Digital e segue os termos e regras atribuídos ao <b class="primary--text">CED – Centro de Estudos Dart</b>.
            <br>A brincadeira é facultativa, não possui caráter pejorativo ou discriminatório e não poderá ter nenhum custo financeiro a nenhum participante.
            <br>Os administradores e participantes concordam com a preservação do sigilo e dados pessoais de todos os participantes, não podendo divulgar as informações que nele contiver.
            <br>A saber, <b class="primary--text">Administrador</b> é o participante responsável por validar, avaliar e excluir participantes e será escolhido por votação anualmente. O quadro de administradores deverá ser composto por no mínimo 20% do total de participantes ativos.</p>
            <p class="mt-2">Ao aceitar participar do IceScream, o participante concorda com os seguintes termos, sabendo que, a qualquer momento, poderá sair da brincadeira.</p>
            <p>1. O participante cadastrado no aplicativo, deverá aceitar os termos de “Política de Uso e Termo de Aceite” para utilizar a aplicação e participar do Ice Scream;</p>
            <p>2. A quantidade de sorvete deverá ser de 200 ml de sorvete para cada participante ativo;</p>
            <p>3. O sabor poderá ser escolhido pelo devedor;</p>
            <p>4. O pagamento deverá ser feito até 15 dias após o evento (ingresso ou aniversário);</p>
            <p>5. Passados 15 dias o participante inadimplente será bloqueado até o pagamento e após 30 dias será excluído da brincadeira caso haja pendências;</p>
            <p>6. Participantes excluídos precisam aguardar 06 meses caso queiram voltar à brincadeira;</p>
            <p>7. Trocas serão permitidas desde que os administradores aprovem;</p>
            <p>8. O participante aceita que sua imagem seja divulgada no aplicativo;</p>
            <p>9. O participante aceita que seja avaliado de acordo com o sorvete comprado (sabor, marca, quantidade e adicionais);</p>
            <p>10. Todas as decisões, regras e demais assuntos que não constarem nesta Politica de Uso e Termo de Aceite, serão tratadas em reuniões convocadas pelo CED.</p>
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
            <p class="primary--text mt-5" style="font-size: 1.3em;">Lido e aceito em {{user.acceptedTermsDate | date}}</p>
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