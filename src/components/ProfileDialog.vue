<template>
  <v-card flat>
    <v-row no-gutters justify="center">
      <v-col>
        <v-img
          :src="getPosterPath(actor.profile_path)"
          class="ma-0"
          gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 1)"
        >
          <template v-slot:placeholder>
            <Loading />
          </template>

          <v-btn fab x-small dark @click="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <Overlay :item="actor" />
        </v-img>
      </v-col>
    </v-row>

    <v-row class="px-2 mx-0">
      <v-card-title
        v-if="actor.biography"
        class="font-weight-bold text-h4 py-3"
      >
        Bio
      </v-card-title>

      <v-card-text class="text-h6">
        {{ actor.biography }}
      </v-card-text>

      <v-card-title
        v-if="actor.place_of_birth"
        class="font-weight-bold text-h4 py-3"
      >
        Place of Birth
      </v-card-title>

      <v-card-text class="text-h6">
        {{ actor.place_of_birth }}
      </v-card-text>
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
