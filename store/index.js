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
        status: '',
        load: false,
        waitPDF: false,
        events: []
    },
    mutations: {
    },
    getters: {
    
    },
    actions: {
        async openConnection({commit, dispatch, state}){
            state.connection = new WebSocket("ws://localhost:8081/ws")
            // state.connection = new WebSocket("ws://95.143.188.184:8081/ws")
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
                if(!(event.data instanceof Blob)){
                    if(JSON.parse(event.data).type == 'getpatients'){
                        state.patients_json.patients_list = JSON.parse(event.data).patients_list
                    }
                    else if(JSON.parse(event.data).type == 'getpatient'){
                        var p_item = JSON.parse(event.data).patient
                        console.log(p_item)
                        state.load = false

                        state.patients_json.patients_list.forEach(element =>{
                            
                                if(element.patient_id == p_item.patient_id){
                                    if(p_item.pictures != null){
                                        element.pictures = p_item.pictures
                                        element.diagnosis = p_item.diagnosis
                                        element.status = p_item.status
                                        element.picture_count = p_item.pictures_count
                                    }
                                }
                        })
                        
                        // var p_item = JSON.parse(event.data).patient
                        // state.patients_json.patients_list.forEach(element =>{
                        //     if(element.patient_id == p_item.patient_id){
                        //         element.picture = p_item.picture
                        //     }
                        // })
                    }
                    else if(JSON.parse(event.data).type == 'onLoad'){
                        // if(JSON.parse(event.data).count > 0){
                            state.load = true
                        // }
                    }
                    else if(JSON.parse(event.data).type == 'waitPDF'){
                        state.waitPDF = true
                    }
                    else if(JSON.parse(event.data).type == 'eventLog'){
                        console.log(JSON.parse(event.data))
                        var data = JSON.parse(event.data)
                        state.events = data.event_list
                    }
                    // else if(JSON.parse(event.data).type == 'get_archived_patient'){
                    //     var p_item = JSON.parse(event.data).patient
                    //     console.log(p_item)
                    //     state.load = false

                    //     // if(p_item.pictures != null){
                    //     //     state.patients_json.patients_list = state.patients_json.patients_list.concat(p_item.pictures)
                    //     // }

                    //     state.patients_json.patients_list.forEach(element =>{
                            
                    //         if(element.patient_id == p_item.patient_id){
                    //             if(p_item.pictures != null){
                    //                 element.pictures = element.pictures.concat(p_item.pictures)
                    //             }
                    //         }
                    //     })
                    // }
                    // console.log(JSON.parse(event.data))
                    
                    // console.log(state.patients_json)
                }
                else{
                    state.waitPDF = false
                    var file_name = Math.random().toString(36).substring(6) + '_name.pdf'; //e.g ueq6ge1j_name.pdf
                    var file_object = new File([event.data], file_name, {type: 'application/pdf'});
                    // console.log(file_object); //Output

                
                    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
                    const blobUrl = URL.createObjectURL(file_object);
                    
                    // Create a link element
                    const link = document.createElement("a");
                    
                    // Set link's href to point to the Blob URL
                    link.href = blobUrl;
                    link.target = "_blank";
                    // link.download = file_name;
                    
                    // Append link to the body
                    document.body.appendChild(link);
                    
                    // Dispatch click event on the link
                    // This is necessary as link.click() does not work on the latest firefox
                    link.dispatchEvent(
                        new MouseEvent('click', { 
                        bubbles: true, 
                        cancelable: true, 
                        view: window 
                        })
                    );
                    
                    // Remove link from body
                    document.body.removeChild(link);
                }
            }

            state.connection.onclose = function(event){
                console.log(event)
                console.log("Closed")
            }
        },
        async sendMessage({commit, state}, data){
            var message = {
                type: 'sendfile',
                patient_name: data.patient.name,
                patient_id: data.patient.patient_id,
                files:{
                    file1: {
                        file_name: null,
                        file_prefix: null,
                        file: null,
                        selectedBreastType: 'right'
                    },
                    file2: {
                        file_name: null,
                        file_prefix: null,
                        file: null,
                        selectedBreastType: 'left'
                    },
                    file3: {
                        file_name: null,
                        file_prefix: null,
                        file: null,
                        selectedBreastType: 'right'
                    },
                    file4: {
                        file_name: null,
                        file_prefix: null,
                        file: null,
                        selectedBreastType: 'left'
                    }
                },
                files_property:{
                    selectedResolution: data.form.selectedResolution,
                    selectedApproximation: data.form.selectedApproximation,
                    // selectedBreastType: data.form.selectedBreastType,
                    resolutionW: data.form.resolutionW,
                    resolutionH: data.form.resolutionH,
                    approximationW: data.form.approximationW,
                    approximationH: data.form.approximationH
                },
                user: data.user
            }
            function encodeImageFileAsURL(file, file_type, breast_type) {
                var reader = new FileReader();
                reader.onloadend = function() {
                    var file_array = reader.result.split(',')
                    message.files[file_type] = {
                        file_name: file.name,
                        file_prefix: file_array[0] + ',',
                        file: file_array[1],
                        selectedBreastType: breast_type
                    }
                }
                reader.readAsDataURL(file);
            }
            encodeImageFileAsURL(data.form.file1, 'file1', 'right')
            encodeImageFileAsURL(data.form.file2, 'file2', 'left')
            encodeImageFileAsURL(data.form.file3, 'file3', 'right')
            encodeImageFileAsURL(data.form.file4, 'file4', 'left')
            setTimeout(() => {
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
            }, "1000")
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
                data: data
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
        // async changeDiagnosis({commit}, data){
        //     var message = {
        //         type: 'changeDiagnosis',
        //         data: data
        //     }
        //     this.state.connection.send(JSON.stringify(message))
        // },
        async getPatients({commit}, user){
            var message = {
                type: 'getPatients',
                user: user
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async changeDiagnosisCoords({commit}, data){
            var message = {
                type: 'changeDiagnosisCoords',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async changeRemark({commit}, data){
            var message = {
                type: 'changeRemark',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async changeComment({commit}, data){
            var message = {
                type: 'changeComment',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async changeDiagnosis({commit}, data){
            var message = {
                type: 'changeDiagnosis',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async addToArchive({commit}, data){
            var message = {
                type: 'archivingRecords',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async deleteRecord({commit}, data){
            var message = {
                type: 'deleteRecord',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async showArchive({commit}, data){
            var message = {
                type: 'showArchive',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async printDocument({commit}, data){
            var message = {
                type: 'printDocument',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async getEventLog({commit}, data){
            var message = {
                type: 'getEventLog',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async getEventLogPatient({commit}, data){
            var message = {
                type: 'getEventLogPatient',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async userConfirmDiagnosis({commit}, data){
            var message = {
                type: 'userConfirmDiagnosis',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        }
    }
})

export default store