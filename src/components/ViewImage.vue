<template>
    <div class="view-image">
        <img :alt="image.title || ''" :src="image.link"/>
        <span @click="goBack" class="btn"> Back </span>
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

        .btn{
            display: block;
            width: 100%;
            max-width: 200px;
            height: 50px;
            border-radius: 25px;
            outline: none;
            border: none;
            background-image: linear-gradient(to right, #6C63FF, #6C63EF, #6C63FF);
            background-size: 200%;
            font-size: 1.2rem;
            color: #fff;
            font-family: "Poppins", sans-serif;
            text-transform: uppercase;
            margin: 1rem 0;
            cursor: pointer;
            text-align: center;
            line-height: 50px;
            transition: 0.5s;
        }
}

</style>