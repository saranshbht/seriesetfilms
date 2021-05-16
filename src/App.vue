<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <navigation-menu :items="menuItems"></navigation-menu>
    </v-navigation-drawer>
    <v-app-bar app class="indigo darken-4 white--text">
      <v-app-bar-nav-icon
        dark
        @click.stop="drawer = !drawer"
        class="hidden-sm-and-up"
      ></v-app-bar-nav-icon>
      <v-spacer />

      <v-toolbar-title>
        <router-link to="/" custom v-slot="{ href, navigate }">
          <span class="header" :href="href" @click="navigate">
            {{ appName }}
          </span>
        </router-link>
      </v-toolbar-title>

      <v-progress-linear
        v-if="loading"
        indeterminate
        absolute
        bottom
        height="6"
        color="black"
      ></v-progress-linear>

      <v-spacer />
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          dark
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn text dark v-if="isAuthenticated" @click="onSignout">
          <v-icon left dark>exit_to_app</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <!-- <Snackbar text="Failed to logout!" v-model="showSnackbar" /> -->
  </v-app>
</template>

<script type="text/javascript">
  import NavigationMenu from '@/components/NavigationMenu';
  import { mapActions, mapGetters } from 'vuex';
  // import Snackbar from '@/components/Snackbar';

  export default {
    components: {
      NavigationMenu
      // Snackbar
    },
    data() {
      return {
        appName: 'Series Et Films',
        drawer: false
        // showSnackbar: false
      };
    },
    computed: {
      ...mapGetters(['user', 'isAuthenticated', 'loading']),
      menuItems() {
        let menuItems = [
          { icon: 'mdi-account-plus', title: 'Sign Up', link: '/signup' },
          { icon: 'lock_open', title: 'Sign In', link: '/signin' }
        ];
        if (this.isAuthenticated) {
          menuItems = [
            { icon: 'person', title: 'Profile', link: '/profile' },
            {
              icon: 'mdi-heart-multiple',
              title: 'Favorites',
              link: '/favorites'
            }
          ];
        }
        return menuItems;
      }
    },
    methods: {
      ...mapActions(['userSignOut']),

      onSignout() {
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
    cursor: pointer;
  }
</style>
