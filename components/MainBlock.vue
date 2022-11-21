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
                    "key": "info",
                    "label": "Информация"
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
                var data = this.form
                this.$store.dispatch('createPatient', data)
                this.$bvModal.hide('modal-1')
            }
        },
        mounted(){
            this.$store.dispatch('getPatients', this.$auth.user.name)
        // this.$store.dispatch('get_fields')
        // console.log(this.$store.state.connection)
        }
    }
</script>

<style>
    .table{
        color: rgb(209, 209, 209);
    }
    .table-block{
        min-height: 630px;
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