<template>
  <v-dialog width="450px" persistent v-model="showDialog">
    <v-btn icon small slot="activator" v-tooltip:top="{ html: title }" class="primary--text">
      <v-icon>check</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="headline primary--text">Confirmar Pagamento</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-layout row>
                <v-flex xs3>
                  <v-btn 
                    fab 
                    dark 
                    large 
                    @click="setReview('dissatisfied')" 
                    :class="dissatisfied ? 'primary' : 'secondary'">
                    <v-icon dark>sentiment_dissatisfied</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs3>
                  <v-btn 
                    fab 
                    dark 
                    large 
                    @click="setReview('neutral')" 
                    :class="neutral ? 'primary' : 'secondary'">
                    <v-icon dark>sentiment_neutral</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs3>
                  <v-btn 
                    fab 
                    dark 
                    large 
                    @click="setReview('mood')" 
                    :class="mood ? 'primary' : 'secondary'">
                    <v-icon dark>mood</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs3>
                  <img 
                    src="../../../static/black-stamp.png" 
                    height="83px" 
                    style="cursor: pointer"
                    :class="!blackStamp ? 'gray-scale' : ''"
                    @click="setReview('blackStamp')">
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat class="primary--text darken-1" @click="showDialog = false">Cancelar</v-btn>
              <v-btn flat class="primary--text darken-1" :disabled="!validReview" @click="onSaveChanges">Confirmar</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['title', 'debtor'],
  data () {
    return {
      showDialog: false,
      dissatisfied: false,
      neutral: false,
      mood: false,
      blackStamp: false,
      evaluation: ''
    }
  },
  computed: {
    validReview () {
      return this.dissatisfied || this.neutral || this.mood || this.blackStamp
    }
  },
  methods: {
    setReview (review) {
      this.evaluation = ''
      this.dissatisfied = false
      this.neutral = false
      this.mood = false
      this.blackStamp = false
      if (review === 'dissatisfied') {
        this.dissatisfied = true
        this.evaluation = '1'
      } else if (review === 'neutral') {
        this.neutral = true
        this.evaluation = '2'
      } else if (review === 'mood') {
        this.mood = true
        this.evaluation = '3'
      } else if (review === 'blackStamp') {
        this.blackStamp = true
        this.evaluation = '4'
      }
    },
    onSaveChanges () {
      if (!this.validReview) {
        return
      }
      this.$store.dispatch('confirmPayment', {
        idUserDebtor: this.debtor.id,
        paymentDate: new Date(),
        evaluation: this.evaluation
      })
      this.showDialog = false
    }
  }
}
</script>

<style scoped>
.gray-scale {
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
}
</style>
