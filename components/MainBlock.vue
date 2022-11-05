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
                <b-form-checkbox value="status">Статус</b-form-checkbox>
                <b-form-checkbox value="diagnosis">Диагноз</b-form-checkbox>
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
            <!-- <template #cell(picture)="data"> -->
            <template #cell(picture)>
                <!-- {{data.item.picture}} -->
                <b-form-file
                v-model="file"
                size="sm"
                :state="Boolean(file)"
                placeholder="Выберите файл или перетащите его сюда..."
                drop-placeholder="Перетащите файл сюда..."
                ></b-form-file>
                <!-- <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/> -->
                <b-button size="sm" v-on:click="submitFile()">Загрузить изображение</b-button>
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
      import patients_json from '~/static/patients.json'
      export default {
          data() {
              return {
                file: null,
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
                        "key": "picture",
                        "label": "Изображение",
                        "filterByFormatted": true
                    },
                    {
                        "key": "status",
                        "label": "Статус",
                        "filterByFormatted": true
                    },
                    {
                        "key": "diagnosis",
                        "label": "Диагноз",
                        "filterByFormatted": true
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
            patientsItems(){
                var array = []
                array = this.patients_items.patients_list
                return array
            }
          },
          methods: {
                submitFile(){
                    if(this.file != null){
                        console.log(this.file.name)
                        this.$store.dispatch('sendMessage', this.file)
                    }
                },
                search() {
                    this.patients_items = patients_json
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
                    try {
                        event.preventDefault()
                        var data = this.form
                        this.$axios.post("/api/registration", {data}).then((response) => {
                            if(response.data.status == 'OK'){
                                this.$nextTick(() => {
                                    this.$bvModal.hide('modal-1')
                                })
                                this.get_users()
                            }
                            else{
                                this.alertText = response.data.message
                                this.errorAlert = 5
                            }
                    })
                    .catch((err) => {
                        console.error(err);
                        this.alertText = err
                        this.errorAlert = 5
                    });
                    } catch (error) {
                        console.log('Registration error:', error)
                        this.alertText = error
                        this.errorAlert = 5
                    }
                }
          },
          mounted(){
            // this.$store.dispatch('get_fields')
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
    }

    .btn:hover{
        background-color: #125853;
        border-color: #125853;
    }

    .btn:focus {
        background-color: #125853;
        border-color: #125853;
        box-shadow: 0 0 0 0 !important;
    }

    .btn:active {
        background-color: #125853 !important;
        border-color: #125853 !important;
    }
</style>