<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <navigation-menu :items="items"></navigation-menu>
    </v-navigation-drawer>
    <v-app-bar app class="indigo darken-4 white--text">
      <v-app-bar-nav-icon
        dark
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer />
      <router-link to="/">
        <v-toolbar-title to="/">
          <span class="header white--text text-decoration-none">
            {{ appName }}
          </span>
        </v-toolbar-title>
      </router-link>
      <v-spacer />
      <div v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn color="indigo darken-1 white--text" to="/signin">Sign In</v-btn>
      </div>
      <div v-else class="hidden-sm-and-down">
        <v-btn color="indigo darken-1 white--text" @click="logout"
          >Sign Out</v-btn
        >
      </div>
    </v-app-bar>
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <!-- <Snackbar text="Failed to logout!" v-model="showSnackbar" /> -->
  </v-app>
</template>

<script type="text/javascript">
  import NavigationMenu from '@/components/NavigationMenu.vue';
  import { mapActions, mapGetters } from 'vuex';
  // import Snackbar from '@/components/Snackbar.vue';

  export default {
    components: {
      NavigationMenu
      // Snackbar
    },
    data() {
      return {
        appName: 'Series Et Films',
        drawer: false,
        items: [
          {
            href: '/',
            title: 'Home',
            icon: 'home'
          },
          {
            href: '/account',
            title: 'My Account',
            icon: 'account_circle'
          },
          {
            href: '/about',
            title: 'About',
            icon: 'domain'
          }
        ]
        // showSnackbar: false
      };
    },
    computed: {
      ...mapGetters({
        isAuthenticated: 'isAuthenticated',
        getUser: 'getUser'
      })
    },
    methods: {
      ...mapActions(['userSignOut']),
      logout() {
        this.userSignOut();
      }
    }
  };
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Yellowtail&display=swap');
  .header {
    font-family: 'Yellowtail', cursive;
    font-weight: 900;
    font-size: 3rem;
    word-break: break-word;
  }
</style>
