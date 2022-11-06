import Vue from 'vue'
import Vuex from 'vuex'
// import h_fields_json from '~/static/h_fields.json'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    state: {
        connection: null,
        patients_json: {
            patients_list: []
        }
    },
    mutations: {
        openConnection(state){
            state.connection = new WebSocket("ws://localhost:8080/ws")
            state.connection.onopen = function(event){
                
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
                    // console.log(p_item.patient_id)
                    // console.log(p_item.picture_prefix + p_item.picture)
                    state.patients_json.patients_list.forEach(element =>{
                        if(element.patient_id == p_item.patient_id){
                            element.picture = p_item.picture
                        }
                    })
                }
                // console.log(JSON.parse(event.data))
                
                // console.log(state.patients_json)
            }

            state.connection.onclose = function(event){
                console.log(event)
                console.log("Closed")
            }
        },
        sendMessage(state, data){
            function encodeImageFileAsURL(data, patient) {
                var file = data;
                var reader = new FileReader();
                reader.onloadend = function() {
                    // console.log('RESULT', reader.result.split(',')[0])
                    // console.log('RESULT', reader.result.split(',')[1])
                    var file_array = reader.result.split(',')
                    var message = {
                        type: 'sendfile',
                        patient_name: patient.name,
                        patient_id: patient.patient_id,
                        file_name: data.name,
                        file_prefix: file_array[0] + ',',
                        file: file_array[1]
                    }
                    state.connection.send(JSON.stringify(message))
                }
                reader.readAsDataURL(file);
            }
            encodeImageFileAsURL(data.file, data.patient)
        },
        getPicture(state, data){
            var message = {
                type: 'getpatient',
                patient_id: data.patient
            }
            // console.log(JSON.stringify(message))
            // console.log(state.connection)
            state.connection.send(JSON.stringify(message))
        }
    },
    getters: {
    
    },
    actions: {
        async openConnection({commit}){
            commit('openConnection')
        },
        async sendMessage({commit}, data){
            commit('sendMessage', data)
        },
        async getPicture({commit}, data){
            commit('getPicture', data)
        }
    },
})

export default store