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
            setInterval(() => {
                if(this.$store.state.connection == null){
                    this.$store.dispatch('openConnection')
                }
                else if(this.$store.state.connection.readyState != WebSocket.OPEN && this.$store.state.connection.readyState != WebSocket.CONNECTING){
                    this.$store.dispatch('openConnection')
                }
            }, 1000)
        }
    }
</script>

<style scoped>
 .default-layout{
    background-color: #29272e;
    color: rgb(209, 209, 209);
 }
</style>