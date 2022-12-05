<template>
    <div class="p-5 text-center">
        <b-row align-v="center" class="m-0 pb-3">
            <div class="pr-3"><b>Фильтр:</b></div>
            <b-input-group class="w-25" size="sm">
                <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                size="sm"
                placeholder="Введите для поиска"
                ></b-form-input>
                <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Очистить</b-button>
                </b-input-group-append>
            </b-input-group>
            
        
            <div class="px-3"><b>Фильтровать по:</b></div>
            <b-form-checkbox-group v-model="filterOn">
                <b-form-checkbox value="name">ФИО</b-form-checkbox>
                <b-form-checkbox value="patient_id">ID пациента</b-form-checkbox>
                <b-form-checkbox value="datetime">Дата</b-form-checkbox>
            </b-form-checkbox-group>  

            <div class="ml-auto"><b-button v-b-modal.modal-1>Добавить пациента</b-button></div>
        </b-row>
        <div class="table-block">
        <b-table bordered hover 
        :items="patientsItems" 
        :fields="h_fields" 
        :filter="filter" 
        :filter-included-fields="filterOn"
        :per-page="perPage" 
        :current-page="currentPage" 
        @filtered="onFiltered">
            <template #cell(info)="data">
                <nuxt-link size="sm" :to="{ path: 'pict', query: { patient: data.item.patient_id }}">Подробнее</nuxt-link>
            </template>
            <template #cell(status)="data">
                <b-row align-v="center" align-h="center">
                    <b-col v-for="element in data.item.status" :key="element.id" class="p-0" cols="2">
                        <div class="circle" :style="[element.status == 'Не обработан' ? {'background': 'red'} : {'background': 'yellow'}]"></div>
                    </b-col>
                </b-row>
            </template>
            <template #cell(statusConfirm)="data">
                <b-row align-v="center" align-h="center">
                    <b-col v-for="element in data.item.statusConfirm" :key="element.id" class="p-0" cols="2">
                        <div class="circle" :style="[element.statusConfirm == 1 ? {'background': 'green'} : {'background': 'red'}]"></div>
                    </b-col>
                </b-row>
            </template>
            <template #cell(comment)="data">
                <b-row v-if="!data.item.commentEditing" align-h="center" class="m-0">
                    <div>{{data.item.comment}}</div>
                    <div class="pl-3 change-btn">
                        <img @click="commentEdit(data.item)" src="@/assets/img/change.png" title="Изменить комментарий">
                    </div>
                </b-row>
                <b-row v-else class="m-0" align-h="center">
                    <b-form-input v-model="data.item.commentUpd" class="w-75"></b-form-input>
                    <div class="pl-3 change-btn">
                        <img @click="commentConfirm(data.item)" src="@/assets/img/confirm.png"  title="Подтвердить изменения">
                        <img @click="commentCancel(data.item)" src="@/assets/img/cancel.png" title="Отменить изменения">
                    </div>    
                </b-row>
            </template>
            <template #cell(diagnosis)="data">
                <b-row v-if="!data.item.diagnosisEditing" align-h="center" class="m-0">
                    <div>{{data.item.diagnosis}}</div>
                    <div class="pl-3 change-btn">
                        <img @click="diagnosisEdit(data.item)" src="@/assets/img/change.png" title="Изменить диагноз">
                    </div>
                </b-row>
                <b-row v-else class="m-0" align-h="center">
                    <b-form-input v-model="data.item.diagnosisUpd" class="w-75"></b-form-input>
                    <div class="pl-3 change-btn">
                        <img @click="diagnosisConfirm(data.item)" src="@/assets/img/confirm.png"  title="Подтвердить изменения">
                        <img @click="diagnosisCancel(data.item)" src="@/assets/img/cancel.png" title="Отменить изменения">
                    </div>    
                </b-row>
            </template>
        </b-table>
        </div>
        <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        pills
        align="center"
        ></b-pagination>



        <b-modal id="modal-1" title="Добавить пациента" hide-footer @show="resetModal">
            <b-form class="w-100 p-4" @submit="onSubmit">
              <b-form-group id="input-group-1" label="ФИО пациента:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  v-model="form.name"
                  required
                ></b-form-input>
              </b-form-group>
              <b-row class="m-0 py-3" align-h="center">
                <b-button variant="success" type="submit">Добавить пациента</b-button>
              </b-row>
              <b-alert :show="errorAlert" dismissible @dismissed="errorAlert=0" @dismiss-count-down="countDownErrorChanged" variant="danger">{{alertText}}</b-alert>
            </b-form>
        </b-modal>
    </div>
</template>
  
<script>
    export default {
        data() {
            return {
            patients_items: [],
            filter: null,
            currentPage: 1,
            perPage: 10,
            filterOn: [],
            ussd_sms: [],
            h_fields: [
                {
                    "key": "name",
                    "label": "ФИО",
                    "filterByFormatted": true
                },
                {
                    "key": "patient_id",
                    "label": "ID пациента",
                    "filterByFormatted": true
                },
                {
                    "key": "datetime",
                    "label": "Дата",
                    "filterByFormatted": true
                },
                {
                    "key": "status",
                    "label": "Вычитка 1"
                },
                {
                    "key": "statusConfirm",
                    "label": "Вычитка 2"
                },
                {
                    "key": "diagnosis",
                    "label": "Диагноз"
                },
                {
                    "key": "info",
                    "label": "Информация"
                },
                {
                    "key": "comment",
                    "label": "Комментарий"
                }
            ],
            form: {
                name: '',
            },
            errorAlert: 0,
            dismissSecs: 5,
            alertText: '',
        }
        },
        created() {
            this.search();
        },
        computed: {
        totalRows(){
            return this.patientsItems.length
        },
        patients_json(){
            // console.log(this.$store.state.patients_json)
            return this.$store.state.patients_json
        },
        patientsItems(){
            var array = []
            if(this.patients_items != null){
                array = this.patients_items.patients_list
            }
            return array
        }
        },
        methods: {
            search() {
                // console.log(this.$store.state.patients_json)
                this.patients_items = this.patients_json
                // console.log(this.patients_items)
            },
            onFiltered(filteredItems) {
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            resetModal() {
                this.form.name = ''
            },
            countDownErrorChanged(errorAlert) {
                this.errorAlert = errorAlert
            },
            async onSubmit(event) {
                event.preventDefault()
                var data = {patient: this.form, user: this.$auth.user.name}
                this.$store.dispatch('createPatient', data)
                this.$bvModal.hide('modal-1')
            },
            commentEdit(item){
                console.log(item)
                this.$set(item, 'commentEditing', true)
                this.$set(item, 'commentUpd', item.comment)
            },
            commentCancel(item) {
                this.$set(item, 'commentEditing', false)
            },
            commentConfirm(item){
                var data = {
                    new_comment: item.commentUpd,
                    patient_id: item.patient_id,
                    user: this.$auth.user.name
                }
                this.$store.dispatch('changeComment', data)
                this.commentCancel(item)
            },
            diagnosisEdit(item){
                console.log(item)
                this.$set(item, 'diagnosisEditing', true)
                this.$set(item, 'diagnosisUpd', item.diagnosis)
            },
            diagnosisCancel(item) {
                this.$set(item, 'diagnosisEditing', false)
            },
            diagnosisConfirm(item){
                var data = {
                    new_diagnosis: item.diagnosisUpd,
                    patient_id: item.patient_id,
                    user: this.$auth.user.name
                }
                this.$store.dispatch('changeDiagnosis', data)
                this.diagnosisCancel(item)
            },
        },
        mounted(){
            if(this.$store.state.connection != null){
                this.$store.dispatch('getPatients', this.$auth.user.name)
            }
        }
    }
</script>

<style>
    .change-btn img {
        width: 30px;
        height: 30px;
        cursor: pointer;
        filter: grayscale(1);
    }
    .change-btn img:hover{
        filter: grayscale(0);
        scale: 1.1;
    }
    .circle {
        width: 25px;
        height: 25px;
        -webkit-border-radius: 25px;
        -moz-border-radius: 25px;
        border-radius: 25px;
    }
    .table{
        color: rgb(209, 209, 209);
    }
    .table-block{
        min-height: 650px;
    }
    .table-hover tbody tr:hover{
        color: #30d5c8;
    }
    .page-item.active .page-link {
        background-color: #1e8d84;
        border-color: #1e8d84;
    }
    .page-link{
        color: #1e8d84;
    }
    .page-link:hover{
        color: #1e8d84;
    }
    .page-link:focus{
        box-shadow: 0 0 0 0;
    }
    .custom-file{
        width: 450px;
    }

    .btn{
        background-color: #1e8d84;
        border-color: #1e8d84;
        color: white;
    }

    .btn:hover{
        background-color: #125853;
        border-color: #125853;
        color: white;
    }

    .btn:focus {
        background-color: #125853;
        border-color: #125853;
        box-shadow: 0 0 0 0 !important;
        color: white;
    }

    .btn:active {
        background-color: #125853 !important;
        border-color: #125853 !important;
        color: white;
    }

    a{
        color: #30d5c8
    }
    a:hover{
        color:#125853
    }
</style>