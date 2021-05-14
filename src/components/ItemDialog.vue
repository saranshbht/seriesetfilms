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

    <v-row
      class="justify-space-around pb-2"
      no-gutters
      v-if="!item.episode_number"
    >
      <v-btn
        v-if="isAuthenticated"
        fab
        color="red"
        class="white--text mx-auto"
        @click="onClick"
      >
        <v-icon v-if="!isFavorite">mdi-heart</v-icon>
        <v-icon v-else>mdi-heart-off</v-icon>
      </v-btn>

      <v-btn
        fab
        color="blue"
        class="white--text mx-auto"
        @click="
          $router.push({
            name: 'Item',
            params: { type: item.type || $route.params.type, id: item.id }
          })
        "
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script type="text/javascript">
  import Ratings from './Ratings';
  import Loading from './Loading';
  import Overlay from './Overlay';
  import { mapActions, mapGetters } from 'vuex';
  import { cloneDeep } from 'lodash';

  export default {
    name: 'ItemDialog',
    components: {
      Ratings,
      Loading,
      Overlay
    },
    props: ['item'],
    computed: {
      ...mapGetters(['getBackdropPath', 'user', 'isAuthenticated']),
      isFavorite() {
        return (this.user.favorites[this.item.type] || []).includes(
          this.item.id
        );
      },
      userData() {
        return cloneDeep(this.user);
      }
    },
    methods: {
      ...mapActions(['updateUserData', 'removeFromFavorites']),
      // remove item from user favorites if there, otherwise add the item to user favorites
      onClick() {
        if (this.isFavorite) {
          this.$emit('close-dialog');
          this.userData.favorites[this.item.type].splice(
            this.userData.favorites[this.item.type].indexOf(this.item.id),
            1
          );
          this.removeFromFavorites({ type: this.item.type, id: this.item.id });
        } else {
          if (!this.userData.favorites[this.item.type]) {
            this.userData.favorites[this.item.type] = [];
          }
          this.userData.favorites[this.item.type].push(this.item.id);
        }
        // console.log(this.userData.favorites);
        this.updateUserData({
          userData: this.userData,
          loading: false
        });
      }
    }
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
