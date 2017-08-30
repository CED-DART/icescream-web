<template>
  <v-container>
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
        <h6>Termos de aceitação</h6>
        <p>Mussum Ipsum, cacilds vidis litro abertis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Delegadis gente finis, bibendum egestas augue arcu ut est. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        <p>Sapien in monti palavris qui num significa nadis i pareci latim.  Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Cevadis im ampola pa arma uma pindureta. Quem num gosta di mé, boa gentis num é.</p>
        <p>Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Si num tem leite então bota uma pinga aí cumpadi! Suco de cevadiss deixa as pessoas mais interessantis. Paisis, filhis, espiritis santis.</p>
        <p>Aenean aliquam molestie leo, vitae iaculis nisl. Casamentiss faiz malandris se pirulitá. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.</p>
        <p>Copo furadis é disculpa de bebadis, arcu quam euismod magna. Detraxit consequat et quo num tendi nada. Leite de capivaris, leite de mula manquis sem cabeça. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.</p>
        <p>Mussum Ipsum, cacilds vidis litro abertis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Delegadis gente finis, bibendum egestas augue arcu ut est. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        <p>Sapien in monti palavris qui num significa nadis i pareci latim.  Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Cevadis im ampola pa arma uma pindureta. Quem num gosta di mé, boa gentis num é.</p>
        <p>Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Si num tem leite então bota uma pinga aí cumpadi! Suco de cevadiss deixa as pessoas mais interessantis. Paisis, filhis, espiritis santis.</p>
        <p>Aenean aliquam molestie leo, vitae iaculis nisl. Casamentiss faiz malandris se pirulitá. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.</p>
        <p>Copo furadis é disculpa de bebadis, arcu quam euismod magna. Detraxit consequat et quo num tendi nada. Leite de capivaris, leite de mula manquis sem cabeça. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.</p>
        <p>Mussum Ipsum, cacilds vidis litro abertis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Delegadis gente finis, bibendum egestas augue arcu ut est. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.</p>
        <p>Sapien in monti palavris qui num significa nadis i pareci latim.  Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Cevadis im ampola pa arma uma pindureta. Quem num gosta di mé, boa gentis num é.</p>
        <p>Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Si num tem leite então bota uma pinga aí cumpadi! Suco de cevadiss deixa as pessoas mais interessantis. Paisis, filhis, espiritis santis.</p>
        <p>Aenean aliquam molestie leo, vitae iaculis nisl. Casamentiss faiz malandris se pirulitá. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.</p>
        <p>Copo furadis é disculpa de bebadis, arcu quam euismod magna. Detraxit consequat et quo num tendi nada. Leite de capivaris, leite de mula manquis sem cabeça. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.</p>
      </v-flex>
    </v-layout>
    <v-layout row v-if="!user.acceptedTems">
      <v-flex xs12>
        <v-checkbox v-model="accepted" dark color="primary" :label="checkboxLabel"></v-checkbox>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs>
        <p class="primary--text mt-4" style="font-size: 1.3em;">Lido e aceito em 10/08/2017</p>
      </v-flex>
    </v-layout>
    <v-layout row v-if="!user.acceptedTems">
      <v-flex xs12 class="text-xs-right">
        <v-btn 
          class="primary" 
          :disabled="!readed || !accepted"
          @click="onAcceptTerms">
          <span>
            <v-icon dark>check</v-icon>
          </span>
          Entrar
        </v-btn>
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
        const user = this.$store.getters.user
        this.$store.dispatch('acceptTerms', user)
        this.$router.push('/')
      }
    }
  }
</script>