<template>
  <v-layout>
    <v-flex xs12>
      <v-layout row v-if="response.message !== null">
        <v-flex xs12 lg10 offset-lg1>
          <app-alert @dismissed="onDismissed" :response="response"></app-alert>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 lg10 offset-lg1>
          <h4 class="primary--text mt-2">Usuários</h4>
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
      <v-layout row v-else>
        <v-flex xs12 lg10 offset-lg1>
          <v-card-title>
            <v-btn fab dark small class="primary" v-if="user.admin" router to="/user/new">
              <v-icon dark>add</v-icon>
            </v-btn>
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
              <td class="text-xs-left">{{ props.item.birthDate | date }}</td>
              <td class="text-xs-left">{{ props.item.admissionDate | date }}</td>
              <td class="text-xs-left">{{ props.item.actived ? 'Ativo' : 'Inativo' }}</td>
              <td class="text-xs-center">
                <v-btn 
                  icon 
                  light 
                  router 
                  :to="'/user/' + props.item.id" 
                  v-tooltip:top="{ html: 'Visualizar' }">
                  <v-icon>visibility</v-icon>
                </v-btn>
                <v-btn 
                  icon 
                  light 
                  router 
                  :to="'/user/edit/' + props.item.id" 
                  v-tooltip:top="{ html: 'Editar' }"
                  v-if="user.admin">
                  <v-icon>edit</v-icon>
                </v-btn>
                <app-confirm-dialog 
                  @confirmed="onDialogConfirmed(props.item)" 
                  :icon="setDialogIcon(props.item)" 
                  :title="setDialogTitle(props.item)" 
                  :message="setDialogMessage(props.item)"
                  v-if="user.admin">
                </app-confirm-dialog>
              </td>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2 pb-2 white">
            <v-pagination circle v-model="pagination.page" :length="pages"></v-pagination>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        pagination: {
          rowsPerPage: 5
        },
        headers: [
          { text: 'Nome', align: 'left', value: 'name' },
          { text: 'E-mail', align: 'left', value: 'email' },
          { text: 'Nascimento', align: 'left', value: 'birthDate' },
          { text: 'Contrato', align: 'left', value: 'admissionDate' },
          { text: 'Status', align: 'left', value: 'actived', sortable: false },
          { text: 'Ações', align: 'center', value: '', sortable: false }
        ],
        items: []
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
      loading () {
        return this.$store.getters.loading
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
      },
      response (value) {
        if (value !== null && value.type !== null) {
          if (value.type === 'success') {
            setTimeout(() => {
              this.$store.dispatch('clearResponse')
            }, 2500)
          }
        }
      }
    },
    methods: {
      onDismissed () {
        this.$store.dispatch('clearResponse')
      },
      setDialogIcon (user) {
        if (user.actived) {
          return 'lock_outline'
        }
        return 'lock_open'
      },
      setDialogTitle (user) {
        if (user.actived) {
          return 'Bloquear'
        }
        return 'Desbloquear'
      },
      setDialogMessage (user) {
        if (user.actived) {
          return `Deseja realmente bloquear o usuário ${user.name}?`
        }
        return `Deseja realmente desbloquear o usuário ${user.name}`
      },
      onDialogConfirmed (user) {
        this.$store.dispatch('enableDisableUser', {
          id: user.id,
          active: !user.actived
        })
      }
    }
  }
</script>
