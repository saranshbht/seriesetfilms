<template>
  <v-container fluid>
    <v-row class="pa-2">
      <template v-for="(item, i) in collection">
        <v-col xs="6" sm="4" md="3" lg="2" xl="1" :key="i">
          <ItemCard :item="item" :width="cardWidth" :height="cardHeight" />
        </v-col>
      </template>
    </v-row>
    <!-- <v-row v-else class="text-xl-h1 text-center justify-center grey--text">
      No items found
    </v-row> -->
  </v-container>
</template>

<script type="text/javascript">
import ItemCard from "@/components/ItemCard.vue";

export default {
  name: "CollectionCard",
  components: {
    ItemCard,
  },
  props: ["collection", "cardHeight", "cardWidth"],
};
</script>
