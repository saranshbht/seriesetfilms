<template>
  <v-card flat style="position: relative;">
    <v-row no-gutters justify="center">
      <v-col cols="10" md="4">
        <!-- <v-img
          :src="getPosterPath(actor.profile_path)"
          class="ma-0"
          gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 1)"
          height="100%"
          width="100%"
        > -->
        <v-img
          :src="getPosterPath(actor.profile_path)"
          :alt="actor.name"
          contain
          gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 1)"
        >
          <template v-slot:placeholder>
            <Loading />
          </template>
          <Overlay :item="actor" />
        </v-img>
      </v-col>

      <v-col class="px-2 mx-0" cols="10" md="8">
        <v-card-title class="font-weight-bold text-h4 py-3">
          Bio
        </v-card-title>

        <v-card-text class="text-h6">
          {{ actor.biography || 'No data available' }}
        </v-card-text>

        <v-card-title class="font-weight-bold text-h4 py-3">
          Place of Birth
        </v-card-title>

        <v-card-text class="text-h6">
          {{ actor.place_of_birth || 'No data available' }}
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script type="text/javascript">
  // import axios from "axios";
  import { mapGetters } from 'vuex';
  import Loading from './Loading';
  import Overlay from './Overlay';

  export default {
    name: 'ProfileDialog',
    components: {
      Loading,
      Overlay
    },
    props: ['actor'],
    computed: mapGetters([
      'getPosterPath',
      'getProfilePath',
      'getBackdropPath'
    ]),
    methods: {
      onClose() {
        this.$emit('close-dialog');
      }
    }
  };
</script>

<style scoped>
  * {
    word-break: break-word;
  }
  .v-image >>> .v-image__image {
    background-size: 100% 100%;
  }
</style>
