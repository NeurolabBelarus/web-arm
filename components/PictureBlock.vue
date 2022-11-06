<template>
    <div>
        {{patient}}
        {{connection}}
        <!-- <img src="data:image/jpeg;base64," alt=""> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            patient: null
        }
    },
    computed:{
        connection(){
            // console.log(this.$store.state.connection)
            if(this.$store.state.connection != null){
                if(this.$store.state.connection.readyState != 0){
                    // console.log('connection:')
                    // console.log(this.$store.state.connection)
                    this.$store.dispatch('getPicture', this.$route.query) 
                }
                return this.$store.state.connection.readyState
            }
            else{
                return 'null'
            }
        }
    },
    mounted(){
        this.patient = this.$route.query
        // this.$store.dispatch('getPicture', this.$route.query)
    }
}
</script>