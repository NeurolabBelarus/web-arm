<template>
    <div class="px-3" style="min-height: 830px;">
        <!-- Connection: {{connection}} -->
        <b-row class="m-0" v-if="patient != null">
            <div class="pr-3"><b>Patient ID:</b> {{patient.patient_id}}</div>
            <div class="pr-3"><b>Patient Name:</b> {{patient.name}}</div>
            <div class="pr-3"><b>Status:</b> {{patient.status}}</div>
            <div class="pr-3"><b>Diagnosis:</b> {{patient.diagnosis}}</div>
        </b-row>
        <div v-if="patient != null">
            <b-row align-h="center" class="m-0 img-list">
                <b-col cols="4" v-for="item in patient.pictures" :key="item.id" class="p-3 img-item">
                    <b-row class="m-0" align-h="center"><Canvas :img="item.pict_prefix + item.pict" /></b-row>
                    <!-- <img :src="item.pict_prefix + item.pict"> -->
                </b-col>
                <b-row align-v="center" class="add-picture-button p-3 m-0"><b-button v-b-modal.modal-1>+</b-button></b-row>
            </b-row>
        </div>


        <b-modal id="modal-1" title="Добавить изображение" hide-footer>
            <b-form @submit="onSubmit">
                <b-row class="m-0" align-h="center">
                    <b-form-file
                    v-model="form.file"
                    size="sm"
                    placeholder="Выберите файл или перетащите его сюда..."
                    drop-placeholder="Перетащите файл сюда..."
                    required
                    ></b-form-file>
                </b-row>
                <b-row class="m-0 pt-3">
                    <div class="pr-2">Разрешение:</div>
                    <b-form-radio-group
                        v-model="form.selectedResolution"
                        :options="resolutionOptions"
                        required
                    ></b-form-radio-group>
                    <b-row align-v="center" class="m-0 pt-2"><div class="pr-1">W:</div><div class="w-50"><b-form-input type="number" size="sm" v-model="form.resolutionW" required></b-form-input></div></b-row>
                    <b-row align-v="center" class="m-0 pt-2"><div class="pr-1">H:</div><div class="w-50"><b-form-input type="number" size="sm" v-model="form.resolutionH" required></b-form-input></div></b-row>
                </b-row>
                <b-row class="m-0 pt-3">
                    <div class="pr-2">Аппроксимация:</div>
                    <b-form-radio-group
                        v-model="form.selectedApproximation"
                        :options="resolutionOptions"
                        required
                    ></b-form-radio-group>
                    <b-row align-v="center" class="m-0 pt-2"><div class="pr-1">W:</div><div class="w-50"><b-form-input type="number" size="sm" v-model="form.approximationW" required></b-form-input></div></b-row>
                    <b-row align-v="center" class="m-0 pt-2"><div class="pr-1">H:</div><div class="w-50"><b-form-input type="number" size="sm" v-model="form.approximationH" required></b-form-input></div></b-row>
                </b-row>
                <b-row class="m-0 pt-3">
                    <div class="pr-2">Тип груди:</div>
                    <b-form-radio-group
                        v-model="form.selectedBreastType"
                        :options="breastTypeOptions"
                        required
                    ></b-form-radio-group>
                </b-row>
                <b-row class="m-0 pt-3" align-h="center">
                    <b-button size="sm" type="submit">Добавить изображение</b-button>
                </b-row>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            patient_id: null,
            form: {
                file: null,
                selectedResolution: null,
                selectedApproximation: null,
                selectedBreastType: null,
                resolutionW: null,
                resolutionH: null,
                approximationW: null,
                approximationH: null
            },
            resolutionOptions: [
                { text: 'Микрон', value: 'micron' },
                { text: 'Пиксель', value: 'pixel' },
            ],
            breastTypeOptions: [
                { text: 'Левая', value: 'left' },
                { text: 'Правая', value: 'right' },
            ]
        }
    },
    computed:{
        connection(){
            if(this.$store.state.connection != null){
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
                }
            });
            return p_item
        }
    },
    methods: {
        onSubmit(event){
            event.preventDefault()
            var p_data = {
                form: this.form,
                patient: this.patient
            }
            this.$store.dispatch('sendMessage', p_data)
            setTimeout(() => {
                    this.$store.dispatch('getPicture', this.$route.query)
                }, "2000")
            this.$bvModal.hide('modal-1')
        },
    },
    mounted(){
        this.patient_id = this.$route.query
        setTimeout(() => {
            this.$store.dispatch('getPicture', this.$route.query)
        }, "2000")
    }
}
</script>

<style scoped>
    .img-list .img-item img {
        width: 100px;
        height: 100px;
        transition: 0.2s linear;
    }
    .img-list .img-item img:hover {
        transform: scale(3);
    }
</style>

<style>
    .custom-control-input:checked ~ .custom-control-label::before {
        color: #fff;
        border-color: #1e8d84;
        background-color: #1e8d84;
    }
    .custom-radio .custom-control-input:checked ~ .custom-control-label::after {
        background-image: none;
    }
    .custom-control-input:not(:disabled):active ~ .custom-control-label::before {
        color: #fff;
        background-color: #36bec2;
        border-color: #36bec2;
    }
    .custom-control-input:focus ~ .custom-control-label::before {
        box-shadow: 0 0 0 0;
    }
</style>