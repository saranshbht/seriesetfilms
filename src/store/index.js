import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import router from "@/router/";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collection: { tv: {}, movie: {} }
    // item: {}
  },

  mutations: {
    setCollection(state, collection) {
      state.collection = collection;
    }
    // setItem(state, payload) {
    // 	state.item = payload;
    // }
  },

  actions: {
    getCollection({ commit }, query) {
      let api_url = process.env.VUE_APP_API_URL;
      let api_key = process.env.VUE_APP_API_KEY;
      console.log('start fetch');
      let collection = {};
      let promiseList = [];
      for (let type of ['tv', 'movie']) {
        let url = api_url,
          params = {};
        params['api_key'] = api_key;
        if (query) {
          url += 'search/' + type;
          params['type'] = type;
          params['query'] = query;
        } else {
          url += `trending/${type}/week`;
        }

        promiseList.push(
          axios
            .get(url, { params })
            .then(response => {
              console.log(response);
              if (response.status == 200) {
                console.log('fetched');
                collection[type] = response.data.results;
                collection[type].map(obj => (obj['type'] = type));
                commit('setCollection', collection);
              } else {
                console.log('failed');
                collection[type] = [];
              }
            })
            .catch(() => {
              console.log('Some error occurred');
              collection[type] = [];
            })
        );
      }
      return Promise.all(promiseList);
    }
  },

  getters: {
    collection: state => state.collection,
    getBackdropPath: () => path => {
      if (path) return 'https://image.tmdb.org/t/p/w780' + path;
      return require('../assets/no-backdrop-image.jpg');
    },
    getProfilePath: () => path => {
      if (path) return 'https://image.tmdb.org/t/p/w185' + path;
      return require('../assets/no-profile-image.jpg');
    },
    getPosterPath: () => path => {
      if (path) return 'https://image.tmdb.org/t/p/w342' + path;
      return require('../assets/no-image.png');
    }
  },

  modules: {}
});
