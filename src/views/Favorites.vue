<template>
  <v-card v-if="user" flat tile class="indigo darken-3">
    <v-tabs v-model="tab" dark grow background-color="transparent">
      <v-tab> TV Shows </v-tab>
      <v-tab> Movies </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <div v-if="!favorites.tv || !favorites.tv.length" class="text-center">
          Mark some shows as favorites
          <v-icon color="red" large>mdi-heart</v-icon>
        </div>
        <CollectionCard
          v-else
          :collection="favorites.tv"
          card-width="200"
          card-height="300"
        />
      </v-tab-item>

      <v-tab-item>
        <div
          v-if="!favorites.movie || !favorites.movie.length"
          class="text-center"
        >
          Mark some movies as favorites
          <v-icon color="red" large>mdi-heart</v-icon>
        </div>
        <CollectionCard
          v-else
          :collection="favorites.movie"
          card-width="200"
          card-height="300"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import CollectionCard from '@/components/CollectionCard';
  // import Loading from '@/components/Loading';

  export default {
    name: 'Home',
    components: {
      CollectionCard
      // Loading
    },
    data() {
      return {
        tab: null
      };
    },
    methods: {
      ...mapActions(['fetchFavorites'])
    },
    computed: mapGetters(['user', 'loading', 'favorites']),
    created() {
      this.fetchFavorites();
    }
  };
</script>

<style scoped></style>
