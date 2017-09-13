<template>
  <v-dialog width="350px" persistent v-model="showDialog">
    <v-btn icon light slot="activator" v-tooltip:top="{ html: title }" :class="isPrimary ? 'primary--text' : ''">
      <v-icon>{{icon}}</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text>{{message}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="primary--text darken-1" flat @click="showDialog = false">Cancelar</v-btn>
        <v-btn class="primary--text darken-1" flat @click="onConfirmAction">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['icon', 'title', 'message', 'isPrimary'],
  data () {
    return {
      showDialog: false
    }
  },
  methods: {
    onConfirmAction () {
      this.showDialog = false
      this.$emit('confirmed')
    }
  }
}
</script>
