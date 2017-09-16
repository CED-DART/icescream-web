<template>
  <v-layout>
    <v-flex xs12>
      <v-layout row v-if="response.message !== null">
        <v-flex xs12 lg10 offset-lg1>
          <app-alert @dismissed="onDismissed" :response="response"></app-alert>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 lg10 offset-lg1>
          <h4 class="primary--text mt-2">Home</h4>
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
    </v-flex>
  </v-layout>
  <!-- <v-container fluid grid-list-md xs12 lg8 offset-lg2>
    <v-layout row wrap>
      <v-flex
        v-bind="{ [`xs${card.flex}`]: true }"
        v-for="card in cards"
        :key="card.title"
      >
        <v-card>
          <v-card-media
            :src="card.src"
            height="200px"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline white--text" v-text="card.title"></span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>bookmark</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container> -->
</template>

<script>
export default {
  data () {
    return {
      cards: [
        { title: 'Pre-fab homes', src: '../../static/profile.jpg', flex: 12 },
        { title: 'Favorite road trips', src: '../../static/profile.jpg', flex: 6 },
        { title: 'Best airlines', src: '../../static/profile.jpg', flex: 6 }
      ],
      debtors: null,
      daysWithoutIceCream: 0
    }
  },
  created () {
    this.$store.dispatch('loadUserDebtors', 3)
    this.$store.dispatch('getLastPaymentDate')
      .then(() => {
        const currentDate = new Date()
        const lastPaymentDate = new Date(this.$store.getters.lastPaymentDate)
        const timeDiff = Math.abs(currentDate.getTime() - lastPaymentDate.getTime())
        this.daysWithoutIceCream = Math.ceil(timeDiff / (1000 * 3600 * 24))
      })
  },
  computed: {
    debtorsList () {
      return this.$store.getters.debtors
    },
    loading () {
      return this.$store.getters.loading
    },
    response () {
      return this.$store.getters.response
    }
  },
  watch: {
    debtorsList (value) {
      this.debtors = value
    }
  }
}
</script>
