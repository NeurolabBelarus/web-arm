<template>
    <div class="default-layout">
        <Header/>
        <Nuxt/>
        <Footer/>
    </div>
</template>

<script>
    export default{
        mounted(){
            this.$store.dispatch('openConnection')
        }
    }
</script>

<style scoped>
 .default-layout{
    background-color: #29272e;
    color: rgb(209, 209, 209);
 }
</style>