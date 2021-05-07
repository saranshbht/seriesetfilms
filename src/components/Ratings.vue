<template>
  <div v-if="item.vote_average && item.vote_count">
    <v-card-title class="font-weight-bold text-h4">
      Ratings
    </v-card-title>

    <v-card-text>
      <v-rating
        v-model="item.vote_average"
        length="10"
        background-color="grey darken-1"
        color="yellow darken-3"
        small
        readonly
        dense
        half-increments
      />
      {{ item.vote_count }} votes
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "Ratings",
  props: ["item"]
};
</script>

<style></style>
