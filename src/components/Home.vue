<template>
  <h4>Home</h4>
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
      debtors: null
    }
  },
  created () {
    this.$store.dispatch('loadUserDebtors', 3)
  },
  computed: {
    debtorsList () {
      return this.$store.getters.debtors
    }
  },
  watch: {
    debtorsList (value) {
      this.debtors = value
    }
  }
}
</script>
