import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    noResultsFound: false,
    errorInResultSearch: false,
    results: [],
    page: 1,
    apiUrl: `https://api.imgur.com/3/gallery/search/`,
    credentials: `Client-ID b067d5cb828ec5a`,
    query: '',
    lastPage: false,
    isLoading:false,
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
    },
    isLoading: state =>{
      return state.isLoading
    }
  },
  mutations: {
    initializeData(state, dataArray) {
      state.results = dataArray;
      state.errorInResultSearch = false;
      state.noResultsFound = false;
      state.lastPage = false;
      state.page = 1;
    },
    changeErrorInSearchField(state) {
      state.errorInResultSearch = true;
      state.isLoading = false;
      state.lastPage = true;
    },
    changeLoadingValue(state, val){
      if(val == 1){
        state.isLoading = true;
      }else{
        state.isLoading = false;
      }
    },  
    updateNoResultsField(state) {
      state.noResultsFound = true;
      state.isLoading = false;
    },
    initializeQueryField(state, query) {
      state.query = query;
    },
    addMoreData(state, data) {
      const results = state.results;
      const mergetResuls = [...results,...data];
      state.results= mergetResuls;
    },
    incrementCurrentPage(state){
      state.page = state.page + 1;
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
      state.isLoading = false;
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
        setTimeout(function(){ 
          commit('initializeData', reducedArray(filterdData));
          commit('changeLoadingValue',0);
      }, 3000);
        
      }
    },
    updatPageStatus({
      commit
    }, dataObj) {
      const dataArray = dataObj.data;
      if (dataArray.length == 0) {
        commit('updateLastPage');
      } else {
        commit('incrementCurrentPage');
      }
    },
    errorInResults({
      commit
    }) {
      commit('changeErrorInSearchField');
    },
    resetSearch({commit}){
      commit('resetState');
    },
    updateLoadingField({commit},val){
      commit('changeLoadingValue',val)
    }
  },
  modules: {}
})