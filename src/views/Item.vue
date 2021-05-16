<template>
  <v-container fluid class="px-0 py-0">
    <v-card v-if="item.id" flat>
      <v-row no-gutters justify="center">
        <v-col cols="12" md="10" lg="6">
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
        </v-col>

        <v-col cols="12" md="10" lg="6" align-self="center">
          <div v-if="item.overview">
            <v-card-title class="font-weight-bold text-h4"> Plot </v-card-title>
            <v-card-text class="text-h6">
              {{ item.overview }}
            </v-card-text>
          </div>

          <Ratings :item="item" />
        </v-col>
      </v-row>

      <v-row no-gutters justify="center">
        <v-col cols="12" md="10" lg="6">
          <div class="font-weight-bold text-h4 my-3 mx-3">
            More Info
          </div>
          <div class="my-3 mx-5">
            <div v-if="item.original_language" class="my-5">
              <div class="text-h5 font-weight-bold">Language</div>
              <div class="subtitle-1 mx-2">
                {{ item.original_language }}
              </div>
            </div>

            <div v-if="item.genres && item.genres.length" class="my-5">
              <div class="text-h5 font-weight-bold">Genres</div>
              <div class="subtitle-1 mx-2">
                {{ item.genres.map(e => e.name).join(', ') }}
              </div>
            </div>

            <div
              v-if="
                item.credits && item.credits.cast && item.credits.cast.length
              "
              class="my-5"
            >
              <div class="text-h5 font-weight-bold">Cast</div>
              <v-row class="px-2">
                <v-col v-for="actor in item.credits.cast" :key="actor.id">
                  <v-row no-gutters>
                    <v-col cols="12" class="pa-1 d-flex justify-center">
                      <img
                        :src="getProfilePath(actor.profile_path)"
                        width="70px"
                        height="100px"
                        style="cursor: pointer;"
                        @click.stop="getActor(actor.id)"
                      />
                    </v-col>

                    <v-col>
                      <div class="text-center">
                        <strong>{{ actor.name }}</strong>
                      </div>
                      <div class="text-center" v-if="actor.character">
                        as
                      </div>
                      <div class="text-center" v-if="actor.character">
                        <i>"{{ actor.character }}"</i>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>

            <div justify="center">
              <v-dialog v-model="dialog" :width="dialogWidth">
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
                <ProfileDialog :actor="actor" @close-dialog="dialog = false" />
              </v-dialog>
            </div>

            <div v-if="item.created_by && item.created_by.length" class="my-5">
              <div class="text-h5 font-weight-bold">Creator(s)</div>
              <div class="subtitle-1 mx-2">
                {{ item.created_by.map(e => e.name).join(', ') }}
              </div>
            </div>

            <div
              v-if="item.origin_country && item.origin_country.length"
              class="my-5"
            >
              <div class="text-h5 font-weight-bold">Country</div>
              <div class="subtitle-1 mx-2">
                {{ item.origin_country.join(', ') }}
              </div>
            </div>

            <div
              v-if="
                item.production_companies && item.production_companies.length
              "
              class="my-5"
            >
              <div class="text-h5 font-weight-bold">
                Production Companies
              </div>
              <div class="subtitle-1 mx-2">
                {{ item.production_companies.map(e => e.name).join(', ') }}
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="10" lg="6">
          <div class="font-weight-bold text-h4 my-3 mx-3">
            Reviews
          </div>
          <div
            v-if="
              item.reviews &&
                item.reviews.results &&
                item.reviews.results.length
            "
          >
            <div
              class="my-3 mx-5"
              v-for="review in item.reviews.results"
              :key="review.id"
            >
              <div>
                <span class="font-weight-bold text-h6">{{
                  review.author
                }}</span>
                wrote
              </div>
              <div class="mx-2">
                {{
                  review.content.length > 200
                    ? review.content.slice(0, 200) + '...'
                    : review.content
                }}
              </div>
            </div>
          </div>
          <div v-else>
            <span class="font-weight-bold text-h6 my-3 mx-5"
              >No reviews available</span
            >
          </div>
        </v-col>
      </v-row>

      <v-row
        no-gutters
        justify="center"
        v-if="item.seasons && item.seasons.length"
      >
        <v-col cols="12" md="10">
          <div class="font-weight-bold text-h4 my-3 mx-3">
            Seasons
          </div>

          <div class="my-3 mx-5">
            <v-expansion-panels tile popout color="primary">
              <v-expansion-panel
                v-for="i in item.number_of_seasons"
                :key="'season' + i"
                class="rounded"
                @click="getSeason(i)"
              >
                <v-expansion-panel-header class="text-h5">
                  Season {{ i }}
                  <template v-slot:actions>
                    <v-icon x-large>
                      $expand
                    </v-icon>
                  </template>
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
          </div>
        </v-col>
      </v-row>

      <v-row
        no-gutters
        justify="center"
        v-if="
          item.similar && item.similar.results && item.similar.results.length
        "
      >
        <v-col cols="12" md="10">
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header
                class="font-weight-bold text-h4 my-3 ml-n3"
              >
                Similar
                <template v-slot:actions>
                  <v-icon x-large>
                    $expand
                  </v-icon>
                </template>
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
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script type="text/javascript">
  import axios from 'axios';
  import { mapActions, mapGetters } from 'vuex';
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
        dialog: false,
        actor: null
      };
    },

    created() {
      this.getItem();
    },

    methods: {
      ...mapActions(['setLoading']),
      getSeason(season) {
        if (season != this.season.season_number) {
          this.season = {};
          let url = api_url + this.type + '/' + this.id + '/season/' + season;
          this.setLoading(true);
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
                this.setLoading(false);
              }
            })
            .catch(error => {
              console.log(error);
              this.setLoading(false);
            });
        }
      },

      getItem() {
        // if (true) {
        this.item = {};
        this.season = {};
        let url = api_url + this.type + '/' + this.id;
        // console.log(url);
        this.setLoading(true);
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
              if (response.data.similar && response.data.similar.results) {
                response.data.similar.results.map(
                  obj => (obj['type'] = this.type)
                );
              }
              this.item = response.data;
              this.setLoading(false);
            }
          })
          .catch(error => {
            console.log(error);
            this.setLoading(false);
          });
        // }
      },

      getActor(id) {
        let url = api_url + 'person/' + id;
        // console.log(url);
        this.setLoading(true);
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
              this.setLoading(false);
            } else {
              // console.log('failed');
            }
          })
          .catch(error => {
            console.log(error);
            this.setLoading(false);
          });
      }
    },

    computed: {
      ...mapGetters(['getBackdropPath', 'getProfilePath', 'loading']),
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
  * {
    word-break: break-word;
  }
</style>
