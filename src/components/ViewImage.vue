<template>
    <div class="view-image">
        <img :alt="image.title || ''" :src="image.link"/>
        <div class="action-btns">
            <div @click="openImag" class="btn"> Open </div>
            <div @click="goBack" class="btn"> Back </div>
        </div>
        
    </div>
  
</template>

<script>
export default {
    name:"ViewImage",
    props:{
        image: Object
    },
    methods: {
        goBack(){
            this.$parent.selectedImage = null;
            this.$parent.viewImage = false;
        },
        openImag(){
            let link = document.createElement("a");
            link.download = this.image.title.trim().replace(/\s/g, '');
            link.href = this.image.link;
            var win = window.open(link, '_blank');
            win.focus();
        }
    },
}
</script>

<style lang="scss">
.view-image{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    height: 60%;

        img{
            max-width: 100%;
            max-height: 60vh;
        }

        .action-btns{
            display: flex;
            width: 100%;
            justify-content: sper;
            max-width: 500px;
            justify-content: space-around;
        }

        @media screen and (max-width: 768px){
          .btn{
              max-width: 140px;
          }
        }
}

</style>