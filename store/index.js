import Vue from 'vue'
import Vuex from 'vuex'
// import h_fields_json from '~/static/h_fields.json'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    state: {
        connection: null,
        patients_json: {
            patients_list: []
        },
        status: ''
    },
    mutations: {
    },
    getters: {
    
    },
    actions: {
        async openConnection({commit, dispatch, state}){
            state.connection = new WebSocket("ws://localhost:8081/ws")
            // state.connection = new WebSocket("wss://test.nlab.work/ws")
            // state.connection = new WebSocket("wss://faust.metatron.by/ws")
            var user = this.$auth.user.name
            state.connection.onopen = function(event){
                dispatch('getPatients', user)
            }
            state.connection.onerror = function(event){
                console.log(event)
                console.log("Error")
            }

            state.connection.onmessage = function(event){
                console.log(event)
                if(JSON.parse(event.data).type == 'getpatients'){
                    state.patients_json.patients_list = JSON.parse(event.data).patients_list
                }
                else if(JSON.parse(event.data).type == 'getpatient'){
                    var p_item = JSON.parse(event.data).patient
                    console.log(p_item)

                    state.patients_json.patients_list.forEach(element =>{
                        if(element.patient_id == p_item.patient_id){
                            element.pictures = p_item.pictures
                            element.diagnosis = p_item.diagnosis
                        }
                    })
                    
                    // var p_item = JSON.parse(event.data).patient
                    // state.patients_json.patients_list.forEach(element =>{
                    //     if(element.patient_id == p_item.patient_id){
                    //         element.picture = p_item.picture
                    //     }
                    // })
                }
                // console.log(JSON.parse(event.data))
                
                // console.log(state.patients_json)
            }

            state.connection.onclose = function(event){
                console.log(event)
                console.log("Closed")
            }
        },
        async sendMessage({commit, state}, data){
            function encodeImageFileAsURL(data, patient) {
                var file = data.file;
                var reader = new FileReader();
                reader.onloadend = function() {
                    var file_array = reader.result.split(',')
                    var message = {
                        type: 'sendfile',
                        patient_name: patient.name,
                        patient_id: patient.patient_id,
                        file_name: data.file.name,
                        file_prefix: file_array[0] + ',',
                        file: file_array[1],
                        file_property:{
                            selectedResolution: data.selectedResolution,
                            selectedApproximation: data.selectedApproximation,
                            selectedBreastType: data.selectedBreastType,
                            resolutionW: data.resolutionW,
                            resolutionH: data.resolutionH,
                            approximationW: data.approximationW,
                            approximationH: data.approximationH
                        },
                    }
                    state.connection.send(JSON.stringify(message))
                    var interval = setInterval(function () {
                        if(state.connection.bufferedAmount > 0){
                            state.status = 'Идет загрузка...'
                        }
                        else{
                            state.status = ''
                            clearInterval(interval);
                        }
                    }, 100);
                }
                reader.readAsDataURL(file);
            }
            encodeImageFileAsURL(data.form, data.patient)
        },
        async getPicture({commit, state}, data){
            var message = {
                type: 'getpatient',
                patient_id: data.patient
            }
            state.connection.send(JSON.stringify(message))
            var interval = setInterval(function () {
                if(state.connection.bufferedAmount > 0){
                    state.status = 'Идет загрузка...'
                }
                else{
                    state.status = ''
                    clearInterval(interval);
                }
            }, 100);
        },
        async createPatient({commit, state}, data){
            var message = {
                type: 'createpatient',
                patient_name: data.name
            }
            state.connection.send(JSON.stringify(message))
            var interval = setInterval(function () {
                if(state.connection.bufferedAmount > 0){
                    state.status = 'Идет загрузка...'
                }
                else{
                    state.status = ''
                    clearInterval(interval);
                }
            }, 100);
        },
        async changeDiagnosis({commit}, data){
            var message = {
                type: 'changeDiagnosis',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async getPatients({commit}, user){
            var message = {
                type: 'getPatients',
                user: user
            }
            this.state.connection.send(JSON.stringify(message))
        }
    }
})

export default store