<template>
  <v-card flat>
    <v-row no-gutters>
      <v-img
        :src="getBackdropPath(item.backdrop_path || item.still_path)"
        class="ma-0"
        gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.7)"
      >
        <template v-slot:placeholder>
          <Loading />
        </template>

        <Overlay :item="item" />
      </v-img>
    </v-row>

    <v-row class="px-2 mx-0">
      <v-card-title v-if="item.overview" class="font-weight-bold text-h4 py-3">
        Plot
      </v-card-title>

      <v-card-text class="text-h6">
        {{ item.overview }}
      </v-card-text>

      <Ratings :item="item" />
    </v-row>

    <v-row class="justify-space-around pb-2" no-gutters>
      <v-btn fab color="red" class="white--text mx-auto">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn
        v-if="!item.episode_number"
        fab
        color="blue"
        class="white--text mx-auto"
        @click="
          $router.push({
            name: 'Item',
            params: { type: item.type || $route.params.type, id: item.id },
          })
        "
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script type="text/javascript">
import Ratings from "./Ratings";
import Loading from "./Loading";
import Overlay from "./Overlay";
import { mapGetters } from "vuex";

export default {
  name: "ItemDialog",
  components: {
    Ratings,
    Loading,
    Overlay,
  },
  props: ["item"],
  computed: mapGetters(["getBackdropPath"]),
};
</script>

<style scoped>
* {
  word-break: break-word;
}
span {
  display: block;
}
img {
  background-size: cover;
}
</style>
