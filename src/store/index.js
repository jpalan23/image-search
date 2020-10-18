import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    noResultsFound: false,
    errorInResultSearch: false,
    results: [],
    page: 1,
    nextResult: [],
    apiUrl: `https://api.imgur.com/3/gallery/search/`,
    credentials: `Client-ID b067d5cb828ec5a`,
    query: '',
    lastPage: false,
  },
  getters: {
    results: state => {
      return state.results
    },
    noResultsFound: state => {
      return state.noResultsFound
    },
    errorInSearch: state => {
      return state.errorInResultSearch
    },
    showSearchBarInMiddle: state => {
      return state.results.length === 0 && !state.noResultsFound && !state.errorInResultSearch
    },
    lastPage: state => {
      return state.lastPage
    }
  },
  mutations: {
    initializeData(state, dataArray) {

      // const results = getData();
      console.log(dataArray);
      state.results = dataArray;
      state.errorInResultSearch = false;
      state.noResultsFound = false;
      state.lastPage = false;
      state.page = 1;
    },
    changeErrorInSearchField(state) {
      state.errorInResultSearch = true;
    },
    updateNoResultsField(state) {
      state.noResultsFound = true;
    },
    initializeQueryField(state, query) {
      state.query = query;
    },
    addMoreData(state, data) {
      state.results.concat(data);
    },
    updateLastPage(state) {
      state.lastPage = true;
    },
    resetState(state){
      state.results = [];
      state.errorInResultSearch = false;
      state.noResultsFound = false;
      state.lastPage = false;
      state.page = 1;
    }
  },
  actions: {
    storeResults({
      commit
    }, dataObj) {
      const dataArray = dataObj.data;
      const query = dataObj.query;
      commit('initializeQueryField', query);
      if (dataArray.length == 0) {
        commit('updateNoResultsField');
      } else {
        const keysToKeep = ['id', 'title', 'type', 'link'];
        const reducedArray = dataArray => dataArray.map(o => keysToKeep.reduce((acc, curr) => {
          acc[curr] = o[curr];
          return acc;
        }, {}));
        const filterdData = reducedArray(dataArray).filter(img => img.type);
        commit('initializeData', reducedArray(filterdData));
      }
    },
    storeMoreResults({
      commit
    }, dataObj) {
      const dataArray = dataObj.data;
      if (dataArray.length == 0) {
        commit('updateLastPage');
      } else {
        const keysToKeep = ['id', 'title', 'type', 'link'];
        const reducedArray = dataArray => dataArray.map(o => keysToKeep.reduce((acc, curr) => {
          acc[curr] = o[curr];
          return acc;
        }, {}));
        const filterdData = reducedArray(dataArray).filter(img => img.type);
        commit('addMoreData', filterdData);
      }

    },
    errorInResults({
      commit
    }) {
      commit('changeErrorInSearchField');
    },
    resetSearch({commit}){
      commit('resetState');
    }
  },
  modules: {}
})