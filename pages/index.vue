<template>
    <div>
        <b-button @click="send()">Websocket</b-button>
        <MainBlock />
    </div>
</template>

<script>
    export default{
        methods:{
            send(){
                this.$store.dispatch('sendMessage')
            }
        },
        mounted(){
            this.$store.dispatch('openConnection')
        }
    }
</script>