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
      <v-toolbar-title>
        <span class="header"> Series Et Films </span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script type="text/javascript">
import NavigationMenu from "@/components/NavigationMenu.vue";

export default {
  components: { NavigationMenu },
  data() {
    return {
      drawer: false,
      items: [
        {
          href: "/",
          title: "Home",
          icon: "home",
        },
        {
          href: "/account",
          title: "My Account",
          icon: "account_circle",
        },
        {
          href: "/about",
          title: "About",
          icon: "domain",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yellowtail&display=swap");
.header {
  font-family: "Yellowtail", cursive;
  font-weight: 900;
  font-size: 3rem;
  word-break: break-word;
}
</style>
