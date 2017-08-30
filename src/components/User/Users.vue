<template>
  <v-layout>
    <v-flex xs12>
      <!-- <v-layout row v-if="response.message !== null">
        <v-flex xs12>
          <app-alert @dismissed="onDismissed" :response="response"></app-alert>
        </v-flex>
      </v-layout>
      <v-card-title>
        Usuários
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"></v-text-field>
      </v-card-title>
      <v-data-table
        v-bind:headers="headers"
        v-bind:items="items"
        v-bind:search="search"
        v-bind:pagination.sync="pagination"
        hide-actions
        class="elevation-1"
        light>
        <template slot="headerCell" scope="props">
          <span v-tooltip:bottom="{ 'html': props.header.text }">
            {{ props.header.text }}
          </span>
        </template>
        <template slot="items" scope="props" @click="alert(props.item.id)">
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-center">{{ props.item.birthDate }}</td>
          <td class="text-xs-center">{{ props.item.admissionDate }}</td>
          <td class="text-xs-center">{{ props.item.acceptedTemsDate }}</td>
          <td class="text-xs-center">{{ props.item.created }}</td>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2 pb-2 white">
        <v-pagination circle v-model="pagination.page" :length="pages"></v-pagination>
      </div> -->
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        pages: 1,
        pagination: {
          rowsPerPage: 10
        },
        headers: [
          { text: 'Nome', align: 'left', value: 'name' },
          { text: 'E-mail', align: 'left', value: 'email' },
          { text: 'Nascimento', align: 'left', value: 'birthDate' },
          { text: 'Contrato', align: 'left', value: 'admissionDate' },
          { text: 'Termo de Aceite', align: 'left', value: 'acceptedTemsDate' },
          { text: 'Cadastrado', align: 'left', value: 'created' }
        ],
        items: []
      }
    },
    created () {
    },
    computed: {
      response () {
        return this.$store.getters.response
      }
    },
    methods: {
      onDismissed () {
        this.$store.dispatch('clearResponse')
      }
    }
  }
</script>
