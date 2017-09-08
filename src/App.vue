<template>
  <v-app dark>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      clipped
      v-model="drawer"
      enable-resize-watcher
      v-if="userIsAuthenticated"
    >
      <v-list>
        <v-list-tile v-for="(item, i) in menuItems" :key="i" router :to="item.link" :class="item.class">
          <v-list-tile-action>
            <v-icon dark>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> 
        <v-list-tile @click="onLogout" class="hidden-sm-and-up">
          <v-list-tile-action>
            <v-icon dark>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sair</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>       
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed v-if="userIsAuthenticated">
      <v-btn icon dark @click.stop="miniVariant = !miniVariant">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">{{ title }}</router-link>
      </v-toolbar-title>  
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat router to="/profile">
          <v-icon left>face</v-icon>
          Meu Perfil
        </v-btn>
        <v-btn flat @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Sair
        </v-btn>
      </v-toolbar-items>    
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </main>
    <!-- <v-footer>
      <span>&copy; 2017</span>
    </v-footer> -->
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        menuItems: [
          { icon: 'supervisor_account', title: 'Usuários', link: '/users', class: '' },
          { icon: 'store', title: 'Sorveterias', link: '/shops', class: '' },
          { icon: 'monetization_on', title: 'Devedores', link: '/debtors', class: '' },
          { icon: 'check', title: 'Avaliações', link: '/reviews', class: '' },
          { icon: 'face', title: 'Meu Perfil', link: '/profile', class: 'hidden-sm-and-up' }
        ],
        miniVariant: true,
        title: 'Ice Screamer'
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
  @import './stylus/logo'

  .application > main > .container {
    min-height: 93vh;
  }
</style>
