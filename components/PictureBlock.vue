<template>
    <div class="px-3">
        Connection: {{connection}}
        <b-row class="m-0" v-if="patient != null">
            <div class="pr-3"><b>Patient ID:</b> {{patient.patient_id}}</div>
            <div class="pr-3"><b>Patient Name:</b> {{patient.name}}</div>
            <div class="pr-3"><b>Status:</b> {{patient.status}}</div>
            <div class="pr-3"><b>Diagnosis:</b> {{patient.diagnosis}}</div>
        </b-row>
        <div>
            <b-form-file
            v-model="file"
            size="sm"
            placeholder="Выберите файл или перетащите его сюда..."
            drop-placeholder="Перетащите файл сюда..."
            ></b-form-file>
            <b-button size="sm" v-on:click="submitFile(data.item)">Добавить изображение</b-button>
        </div>
        <div v-if="patient != null">
            <b-row align-h="center" class="m-0 img-list">
                <div v-for="item in patient.pictures" :key="item.id" class="p-3"><img :src="item.pict_prefix + item.pict"></div>
            </b-row>
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

<style scoped>
    .img-list img {
        width: 100px;
        height: 100px;
        transition: 0.2s linear;
    }
    .img-list img:hover {
        transform: scale(3);
    }
</style>