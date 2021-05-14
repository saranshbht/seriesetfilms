<template>
  <v-container fluid class="px-0 py-0">
    <v-card flat>
      <v-row no-gutters>
        <v-img
          :src="getBackdropPath(item.backdrop_path)"
          class="ma-0"
          max-height="100vh"
          gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.7)"
        >
          <template v-slot:placeholder>
            <Loading />
          </template>

          <Overlay :item="item" />
        </v-img>
      </v-row>

      <v-row class="px-5">
        <div v-if="item.overview">
          <v-card-title class="font-weight-bold text-h4"> Plot </v-card-title>
          <v-card-text class="text-h6">
            {{ item.overview }}
          </v-card-text>
        </div>

        <Ratings :item="item" />

        <div
          v-if="
            item.reviews && item.reviews.results && item.reviews.results.length
          "
        >
          <v-card-title class="font-weight-bold text-h4">
            Reviews
          </v-card-title>
          <v-card-text v-for="review in item.reviews.results" :key="review.id">
            <div>
              <span class="font-weight-bold text-h6">{{ review.author }}</span>
              wrote
            </div>
            <div>
              {{
                review.content.length > 200
                  ? review.content.slice(0, 200) + '...'
                  : review.content
              }}
            </div>
          </v-card-text>
        </div>
      </v-row>

      <v-row class="px-3">
        <!-- <v-col> -->
        <v-expansion-panels flat>
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-h4">
              More Info
            </v-expansion-panel-header>
            <v-expansion-panel-content class="px-3">
              <div v-if="item.original_language">
                <div class="text-h5 font-weight-bold">Language</div>
                <div class="subtitle-1">
                  {{ item.original_language }}
                </div>
              </div>

              <div v-if="item.genres && item.genres.length">
                <div class="text-h5 font-weight-bold">Genres</div>
                <div class="subtitle-1">
                  {{ item.genres.map(e => e.name).join(', ') }}
                </div>
              </div>

              <div
                v-if="
                  item.credits && item.credits.cast && item.credits.cast.length
                "
              >
                <div class="text-h5 font-weight-bold">Cast</div>
                <v-layout row wrap class="px-5">
                  <v-flex
                    v-for="actor in item.credits.cast"
                    :key="actor.id"
                    xs12
                    sm6
                    md4
                    lg3
                    class="subtitle-1"
                  >
                    <v-row no-gutters>
                      <v-col cols="auto" class="pa-2">
                        <v-img
                          :src="getProfilePath(actor.profile_path)"
                          width="70px"
                          height="100px"
                          @click.stop="getActor(actor.id)"
                        >
                          <template v-slot:placeholder>
                            <Loading />
                          </template>
                        </v-img>
                      </v-col>

                      <v-col>
                        <v-row class="px-2" no-gutters>
                          <strong>{{ actor.name }}</strong>
                        </v-row>
                        <v-row v-if="actor.character" class="px-2" no-gutters>
                          as <i>"{{ actor.character }}"</i>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-flex>
                </v-layout>
              </div>

              <div justify="center">
                <v-dialog v-model="dialog" max-width="350">
                  <!-- <v-btn
                    fab
                    fixed
                    right
                    bottom
                    dark
                    color="primary"
                    @click="dialog = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn> -->
                  <ProfileDialog
                    :actor="actor"
                    @close-dialog="dialog = false"
                  />
                </v-dialog>
              </div>

              <div v-if="item.created_by && item.created_by.length">
                <div class="text-h5 font-weight-bold">Creator(s)</div>
                <div class="subtitle-1">
                  {{ item.created_by.map(e => e.name).join(', ') }}
                </div>
              </div>

              <div v-if="item.origin_country && item.origin_country.length">
                <div class="text-h5 font-weight-bold">Country</div>
                <div class="subtitle-1">
                  {{ item.origin_country.join(', ') }}
                </div>
              </div>
              <div
                v-if="
                  item.production_companies && item.production_companies.length
                "
              >
                <div class="text-h5 font-weight-bold">Production Companies</div>
                <div class="subtitle-1">
                  {{ item.production_companies.map(e => e.name).join(', ') }}
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <!-- </v-col> -->
      </v-row>

      <v-row v-if="item.seasons && item.seasons.length" class="px-5">
        <v-card-title class="font-weight-bold text-h4"> Seasons </v-card-title>
        <v-card-text>
          <v-expansion-panels v-model="panel" tile popout color="primary">
            <v-expansion-panel
              v-for="i in item.number_of_seasons"
              :key="'season' + i"
              class="rounded"
              @click="getSeason(i)"
            >
              <v-expansion-panel-header class="text-h5">
                Season {{ i }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container fluid>
                  <v-row class="justify-space-around">
                    <ItemCard
                      v-for="(item, i) in season.episodes"
                      :key="i"
                      :item="item"
                      width="300"
                      height="200"
                    />
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-row>

      <v-row
        v-if="
          item.similar && item.similar.results && item.similar.results.length
        "
        class="px-3"
      >
        <v-expansion-panels flat>
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-h4">
              Similar
            </v-expansion-panel-header>
            <v-expansion-panel-content class="px-3">
              <v-container fluid>
                <v-row class="justify-space-around">
                  <ItemCard
                    v-for="sitem in item.similar.results"
                    :key="sitem.id"
                    :item="sitem"
                    width="200"
                    height="300"
                  />
                </v-row>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-card>
  </v-container>
</template>

<script type="text/javascript">
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import ItemCard from '@/components/ItemCard';
  import Ratings from '@/components/Ratings';
  import Loading from '@/components/Loading';
  import Overlay from '@/components/Overlay';
  import ProfileDialog from '@/components/ProfileDialog';

  let api_url = process.env.VUE_APP_API_URL;
  let api_key = process.env.VUE_APP_API_KEY;

  export default {
    name: 'Item',
    components: {
      ItemCard,
      Ratings,
      Loading,
      Overlay,
      ProfileDialog
    },
    props: ['type', 'id'],

    data() {
      return {
        item: {},
        season: {},
        loading: false,
        panel: -1,
        dialog: false,
        actor: null
      };
    },

    watch: {
      $route: 'getItem'
    },

    created() {
      this.getItem();
    },

    methods: {
      getSeason(season) {
        if (season != this.season.season_number) {
          this.season = {};
          let url = api_url + this.type + '/' + this.id + '/season/' + season;
          axios
            .get(url, {
              params: {
                api_key
              }
            })
            .then(response => {
              if (response.status == 200) {
                // console.log('fetched');
                // console.log(response.data);
                this.season = response.data;
              } else {
                // console.log('failed');
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },

      getItem() {
        // if (true) {
        this.season = {};
        let url = api_url + this.type + '/' + this.id;
        // console.log(url);
        axios
          .get(url, {
            params: {
              api_key,
              append_to_response: 'credits,similar,reviews'
            }
          })
          .then(response => {
            if (response.status == 200) {
              // console.log('fetched');
              // console.log(response.data);
              this.item = response.data;
            } else {
              // console.log('failed');
            }
          })
          .catch(error => {
            console.log(error);
          });
        // }
      },

      getActor(id) {
        let url = api_url + 'person/' + id;
        // console.log(url);
        axios
          .get(url, {
            params: {
              api_key
            }
          })
          .then(response => {
            // console.log(response.data);
            if (response.status == 200) {
              this.actor = response.data;
              this.dialog = true;
            } else {
              // console.log('failed');
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    computed: mapGetters(['getBackdropPath', 'getProfilePath'])
  };
</script>

<style scoped>
  * {
    word-break: break-word;
  }
</style>
