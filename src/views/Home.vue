<template>
  <v-card flat tile class="indigo darken-3">
    <v-card-title>
      <v-text-field
        v-model="search"
        hide-details
        label="Search"
        prepend-inner-icon="search"
        solo
        @keydown.enter="updateCollection()"
      />
    </v-card-title>

    <v-tabs v-model="tab" dark grow background-color="transparent">
      <v-tab> TV Shows </v-tab>
      <v-tab> Movies </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <Loading v-if="loading" />
        <CollectionCard
          v-else
          :collection="collection.tv"
          card-width="200"
          card-height="300"
        />
      </v-tab-item>

      <v-tab-item>
        <Loading v-if="loading" />
        <CollectionCard
          v-else
          :collection="collection.movie"
          card-width="200"
          card-height="300"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  // @ is an alias to /src
  import { mapActions, mapGetters } from 'vuex';
  import CollectionCard from '@/components/CollectionCard.vue';
  import Loading from '@/components/Loading.vue';

  export default {
    name: 'Home',
    components: {
      CollectionCard,
      Loading
    },
    data() {
      return {
        tab: null,
        loading: false,
        search: ''
      };
    },
    methods: {
      ...mapActions(['fetchCollection']),
      async updateCollection() {
        this.loading = true;
        console.log(this.search);
        await this.getCollection(this.search);
        console.log(this.$vuetify.breakpoint.name);
        this.loading = false;
      }
    },
    computed: mapGetters(['getCollection']),
    async created() {
      this.loading = true;
      await this.fetchCollection(this.search);
      this.loading = false;
      this.collection = this.getCollection;
      console.log(this.getCollection);
    }
  };
</script>

<style scoped></style>
