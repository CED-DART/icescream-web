<template>
  <v-layout>
    <v-flex xs12>
      <v-layout row v-if="response.message !== null">
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
        <template slot="items" scope="props">
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.birthDate }}</td>
          <td class="text-xs-left">{{ props.item.admissionDate }}</td>
          <td class="text-xs-center">
            <v-btn icon small light router :to="'/user/' + props.item.id">
              <v-icon>visibility</v-icon>
            </v-btn>
            <v-btn icon small light v-if="user.admin" router :to="'/user/edit/' + props.item.id">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon small light v-if="user.admin" @click="showDialog = !showDialog">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2 pb-2 white">
        <v-pagination circle v-model="pagination.page" :length="pages"></v-pagination>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        pagination: {
          rowsPerPage: 10
        },
        headers: [
          { text: 'Nome', align: 'left', value: 'name' },
          { text: 'E-mail', align: 'left', value: 'email' },
          { text: 'Nascimento', align: 'left', value: 'birthDate' },
          { text: 'Contrato', align: 'left', value: 'admissionDate' },
          { text: 'Ações', align: 'center', value: '', sortable: false }
        ],
        items: [],
        showDialog: false
      }
    },
    created () {
      this.$store.dispatch('loadUsers')
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      response () {
        return this.$store.getters.response
      },
      users () {
        return this.$store.getters.users
      },
      pages () {
        return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
      }
    },
    watch: {
      users (value) {
        this.items = value
      }
    },
    methods: {
      onDismissed () {
        this.$store.dispatch('clearResponse')
      }
    }
  }
</script>
