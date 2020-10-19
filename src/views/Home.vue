<template>
  <div :class="results.length > 0 ?'home height-fix' : 'home'">
    <SearchBar/>
    <ResultsView v-if="results.length > 0 && !viewImage" />
    <InfoBoard v-if="noResultsFound || errorInSearch || isLoading" />
    <ViewImage :image="selectedImage" v-if="viewImage" />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue'
import InfoBoard from '@/components/InfoBoard.vue'
import ResultsView from '@/components/Results.vue'
import ViewImage from '@/components/ViewImage.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    SearchBar,
    InfoBoard,
    ResultsView,
    ViewImage
  },
  data() {
    return {
      selectedImage:null,
      viewImage:false
    }
  },
  computed: {
    ...mapGetters([
      'errorInSearch',
      'noResultsFound',
      'results',
      'isLoading'
    ])
  },
}
</script>

<style lang="scss">
.home{
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    width: 100%;
    align-items: center;
}
.home.height-fix{
  height: auto;
}
</style>
