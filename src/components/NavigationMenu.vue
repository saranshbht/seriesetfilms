<template>
  <v-list v-if="isAuthenticated" class="d-flex flex-column" height="100%">
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>John Leider</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <template v-for="(item, index) in items">
      <v-list-item :href="item.href" :to="item.href" :key="index">
        <v-list-item-action>
          <v-icon light v-html="item.icon"></v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-html="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-list-item class="mt-auto justify-center">
      <v-btn color="indigo darken-1 white--text" @click="logout"
        >Sign Out</v-btn
      >
    </v-list-item>
  </v-list>

  <div v-else class="text-center mt-5">
    <v-btn color="indigo darken-1 white--text" to="/signin">Sign In</v-btn>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    props: ['items'],
    computed: mapGetters(['isAuthenticated']),
    methods: {
      ...mapActions(['userSignOut']),
      logout() {
        this.userSignOut();
      }
    }
  };
</script>

<style scoped>
  .v-list-item {
    flex: 0;
  }
</style>
