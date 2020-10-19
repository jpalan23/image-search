<template>
  <div class="info-board">
      <span v-if="noResultsFound"> No Results found </span>
      <span v-if="errorInSearch"> Error in search, please try again later </span>
      <span v-if="isLoading"> Loading... </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name:'InfoBoard',
    computed: {
    ...mapGetters([
      'errorInSearch',
      'noResultsFound',
      'isLoading'
    ])
  }
}
</script>

<style lang="scss">
.info-board{
  color:  var(--secondary-color);
  font-size: 1.2rem;
}

</style>