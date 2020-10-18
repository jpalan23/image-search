<template>
  <div v-infinite-scroll="loadMore"  infinite-scroll-disabled="busy" infinite-scroll-distance="5" class="results">
      <div v-for="(image) in results" class="image-container"  :key="image.id">
        <img :alt="image.title || ''" class="lozad" @click="viewImage(image)"
        :src="image.link" loading="lazy"/>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import lozad from 'lozad';
import infiniteScroll from 'vue-infinite-scroll';
import { loadMoreResults } from '../service/searchService';
export default {
    name:'Results',
    computed: {
      ...mapGetters([
        'results',
        'lastPage'
      ])
    },
    directives: {infiniteScroll},
    mounted() {
      const observer = lozad(); // lazy loads elements with default selector as '.lozad'
      observer.observe();
    },
    methods: {
      loadMore: async function(){
        if(!this.lastPage){
          await loadMoreResults().then(()=>{this.$forceUpdate();})
        }
      },
      viewImage(image){
        this.$parent.selectedImage = image;
        this.$parent.viewImage = true;
      }
    },

}
</script>

<style lang="scss">
.results{
    
    line-height: 0;
    -webkit-column-count: 5;
    -webkit-column-gap: 0px;
    -moz-column-count: 5;
    -moz-column-gap: 0px;
    column-count: 5;
    column-gap: 10px;
    /* row-gap: 10px; */
    width: 80%;

    .image-container{
      margin-bottom:20px;
      img{
        max-width: 100%;
      }
    }

    @media screen and (max-width: 970px){
      column-count: 4;
    }

    @media screen and (max-width: 768px){
      column-count: 2;
    }

    
}
</style>