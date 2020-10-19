import axios from 'axios';
import store from '../store';
axios.defaults.headers.common['Authorization'] = store.state.credentials;

export function http() {
    return axios.create({
        baseURL: store.state.apiUrl,
    });
}

export function fetchResults(query) {
    store.dispatch('updateLoadingField',1);
    return http().get(`top/all/1/?q=${query}`)
        .then(res => {
            store.dispatch('storeResults', {
                data: res.data.data,
                query: query
            });
            return res;
        }).catch(err => {
            console.error(err);
            store.dispatch('errorInResults');
            store.dispatch('updateLoadingField',0);
        });
}

export function loadMoreResults() {
    if (store.state.query.length > 0) {
        store.dispatch('updateLoadingField',1);
        return http().get(`top/all/${store.state.page + 1}/?q=${store.state.query}`)
            .then(res => {
                store.dispatch('updatPageStatus', {
                    data: res.data.data
                });
                store.dispatch('updateLoadingField',0);
                return res;
            }).catch(err => {
                console.error(err);
                store.dispatch('errorInResults');
                store.dispatch('updateLoadingField',0);
            });
    }
}