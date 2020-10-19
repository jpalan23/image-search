<template>
  <div class="result-container">
      <div class="results">
          <div v-for="(image) in searchResults" class="image-container"  :key="image.id">
            <img :alt="image.title || ''" @click="viewImage(image)"
            :src="image.link"/>
        </div>
      </div>
      <div class="more-actions">
        <div @click="loadMore" class="btn"> Load More... </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { loadMoreResults } from '../service/searchService';
export default {
    name:'ResultsView',
    data() {
      return {
        searchResults:[]
      }
    },
    computed: {
      ...mapGetters([
        'results',
        'lastPage'
      ])
    },
    mounted() {
      this.searchResults = this.results;
    },
    methods: {
      getFilteredResults(res){
        const dataArray = res.data;
        const keysToKeep = ['id', 'title', 'type', 'link'];
        const reducedArray = dataArray => dataArray.map(o => keysToKeep.reduce((acc, curr) => {
          acc[curr] = o[curr];
          return acc;
        }, {}));
        const filterdData = reducedArray(dataArray).filter(img => img.type);
        return filterdData;
      },
      loadMore: async function(){
        if(!this.lastPage){
          await loadMoreResults().then((res)=>{
            const newResults = this.getFilteredResults(res.data);
            if(newResults.length == 0){
              // Means no filtered data in this Page result.
              this.loadMore();
            }else{
                for(let i = 0; i < newResults.length; i++){
                  this.searchResults.push(newResults[i]);
                }
            }

          });
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
.result-container{
  width: 80%;
    .results{
        line-height: 0;
        -webkit-column-count: 5;
        -webkit-column-gap: 0px;
        -moz-column-count: 5;
        -moz-column-gap: 0px;
        column-count: 5;
        column-gap: 10px;
        

        .image-container{
            margin-bottom: 20px;
            padding: 5px;
            border: 1px solid var(--light-main-color);
            min-height: 100px;
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

    .more-actions{
      display: flex;
      justify-content: center;
    }
}
</style>