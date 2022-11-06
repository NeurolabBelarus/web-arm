<template>
    <div>
        Connection: {{connection}}
        Patient ID: {{patient.patient_id}}
        <img v-if="patient != null && patient.picture_prefix != null && patient.picture != null" :src="patient.picture_prefix + patient.picture" alt="">
    </div>
</template>

<script>
export default {
    data(){
        return{
            patient_id: null
        }
    },
    computed:{
        connection(){
            if(this.$store.state.connection != null){
                if(this.$store.state.connection.readyState != 0){
                    this.$store.dispatch('getPicture', this.$route.query) 
                }
                return this.$store.state.connection.readyState
            }
            else{
                return 'null'
            }
        },
        patient(){
            var p_item = null
            this.$store.state.patients_json.patients_list.forEach(element => {
                if(element.patient_id == this.$route.query.patient){
                    p_item = element
                    // console.log("DONE")
                }
            });
            return p_item
        }
    },
    mounted(){
        this.patient_id = this.$route.query
        // this.$store.dispatch('getPicture', this.$route.query)
    }
}
</script>