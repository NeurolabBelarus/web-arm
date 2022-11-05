<template>
    <div class="p-5 text-center">
        <div class="large-12 medium-12 small-12 cell">
            <label>File
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            </label>
                <button v-on:click="submitFile()">Submit</button>
        </div>
            <b-row align-v="center" class="m-0 pb-3 px-3">
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
   
            </b-row>

            <b-table bordered hover 
            :items="patientsItems" 
            :fields="h_fields" 
            :filter="filter" 
            :filter-included-fields="filterOn"
            :per-page="perPage" 
            :current-page="currentPage" 
            @filtered="onFiltered">
                <template #cell(picture)="data">
                    {{data.item.picture}}
                    <b-button size="sm">Загрузиь изображение</b-button>
                </template>
            </b-table>
            <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            pills
            align="center"
            ></b-pagination>
    </div>
  </template>
  
  <script>
      import patients_json from '~/static/patients.json'
      export default {
          data() {
              return {
                file: '',
                patients_items: [],
                filter: null,
                totalRows: 1,
                currentPage: 1,
                perPage: 10,
                filterOn: [],
                ussd_sms: [],
                h_fields: [
                    {
                        "key": "name",
                        "label": "Имя",
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
                ]
              }
          },
          created() {
              this.search();
          },
          computed: {
            // totalRows(){
            //     return this.patientsItems.length
            // },
            patientsItems(){
                var array = []
                array = this.patients_items.patients_list
                return array
            }
          },
          methods: {
                handleFileUpload(){
                    this.file = this.$refs.file.files[0]
                },
                submitFile(){
                    let formData = new FormData()
                    formData.append('file', this.file)
                    console.log(this.file)
                    this.$store.dispatch('sendMessage', this.file)
                },
                search() {
                    this.patients_items = patients_json
                },
                onFiltered(filteredItems) {
                    this.totalRows = filteredItems.length
                    this.currentPage = 1
                }
          },
          mounted(){
            // this.$store.dispatch('get_fields')
          }
      }
  </script>