<template>
    <div>
        <MainBlock />
    </div>
</template>

<script>
    export default{
        mounted(){
            this.$store.dispatch('openConnection')
        }
    }
</script>