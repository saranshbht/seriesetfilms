<template>
  <v-card class="my-1" :width="width" :height="height">
    <v-img
      :src="getPosterPath(item.poster_path || item.still_path)"
      gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.7)"
      @click.stop="dialog = true"
      :width="width"
      :height="height"
    >
      <template v-slot:placeholder>
        <Loading />
      </template>

      <div class="d-flex fill-height justify-end flex-column white--text">
        <div cols="12" class="overlay-text px-2 text-h5">
          <span v-if="item.episode_number"> #{{ item.episode_number }}: </span>
          {{ item.name || item.title }}
        </div>
      </div>
    </v-img>

    <v-row justify="center">
      <v-dialog v-model="dialog" :width="dialogWidth">
        <ItemDialog :item="item" @close-dialog="dialog = false" />
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
  import ItemDialog from './ItemDialog';
  import Loading from './Loading';
  import { mapGetters } from 'vuex';

  export default {
    name: 'ItemCard',
    components: {
      ItemDialog,
      Loading
    },
    props: ['item', 'width', 'height'],
    data() {
      return {
        dialog: false
      };
    },
    computed: {
      ...mapGetters(['getPosterPath']),
      dialogWidth() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return this.$vuetify.breakpoint.width;
          default:
            return this.$vuetify.breakpoint.width / 2;
        }
      }
    }
  };
</script>

<style scoped>
  .title,
  .subtitle-1 {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .v-image >>> .v-image__image {
    background-size: 100% 100%;
  }

  .overlay-text {
    word-break: break-word;
    text-align: left;
    color: white;
    font-style: oblique;
    font-weight: 600;
  }
  .v-card {
    cursor: pointer;
  }
</style>
