<template>
  <div class="search-bar">
      <div class="search-image">
          <img src="@/assets/img/image_icon.png" alt="search-image">
      </div>
      
      <div class="form-input">
          <h5>Search Image</h5>
          <input v-model="query" @keyup.enter="searchForImage()" @focus="addClassToParentDiv($event)" @blur="removeClassFromDiv($event)" type="text" />
      </div>
      <div class="icon">
          <i class="fas fa-search"></i>
      </div>
      <div class="icon">
          <i class="fas fa-window-close"></i>
      </div>
  </div>
</template>

<script>
import { fetchResults } from '../service/searchService';
export default {
    name: 'SearchBar',
    data() {
        return {
            query:''
        }
    },
    methods: {
        addClassToParentDiv($event) {
            let parent = $event.target.parentNode.parentNode;
            parent.classList.add('focus')
        },
        removeClassFromDiv($event) {
            let parent = $event.target.parentNode.parentNode;
            if ($event.target.value == '') {
                parent.classList.remove("focus");
            }
        },
        searchForImage: async function(){
            if(this.query.trim().length > 0){
                await fetchResults(this.query);
            }
        }
    },
}
</script>

<style  lang="scss">
.search-bar{
    width: 100%;
    position: relative;
    display: grid;
    grid-template-columns: 50px auto 40px  40px;
    margin: 25px 0;
    padding: 5px 0;
    border: 2px solid var(--main-color);
    
    &::before {
        right: 50%;
    }

    &::before,
    &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        width: 0%;
        height: 2px;
        background-color: var(--main-color);
        transition: .4s;
    }

    &:first {
        margin-top: 0;
    }
    .search-image{
        img{
            width: 60px;
        }
    }
    div {
        position: relative;
        height: 45px;
    }

    .icon {
        color: var(--light-main-color);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form-input {
        h5 {
            position: absolute;
            left: 10px;
            top: -20px;
            color: var(--light-main-color);
            font-size: 18px;
            transition: .3s;
        }


        input {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            background: none;
            font-size: 1.2rem;
            color: var(--font-color);
            font-family: 'poppins', sans-serif;
        }
    }

}

.search-bar.focus {
    h5 {
        top: -45px;
        font-size: 15px;
        background: #fff;
        z-index: 25;
    }

    .icon {
        color: var(--secondary-color);
    }
}
</style>