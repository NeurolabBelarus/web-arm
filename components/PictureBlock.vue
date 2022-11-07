<template>
    <div>
        Connection: {{connection}}
        <div v-if="patient != null">
            Patient ID: {{patient.patient_id}}
        </div>
        <div v-if="patient != null">
            <img v-for="item in patient.pictures" :key="item.id" :src="item.pict_prefix + item.pict">
        </div>
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
                if(this.$store.state.connection.readyState == 1){
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