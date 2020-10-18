<template>
  <div :class="results.length > 0 ?'home height-fix' : 'home'">
    <SearchBar/>
    <InfoBoard v-if="noResultsFound || errorInSearch" />
    <Results v-if="results.length > 0 && !viewImage" />
    <ViewImage :image="selectedImage" v-if="viewImage" />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue'
import InfoBoard from '@/components/InfoBoard.vue'
import Results from '@/components/Results.vue'
import ViewImage from '@/components/ViewImage.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    SearchBar,
    InfoBoard,
    Results,
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
      'results'
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
