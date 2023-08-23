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
        waitZip: false,
        error: false,
        events: []
    },
    mutations: {
    },
    getters: {
    
    },
    actions: {
        async openConnection({commit, dispatch, state}){
            state.connection = new WebSocket("ws://localhost:8081/ws")
            // state.connection = new WebSocket("wss://st9.nlab.work/ws")
            // state.connection = new WebSocket("ws://95.143.188.184:8081/ws")
            // state.connection = new WebSocket("wss://test.nlab.work/ws")
            // state.connection = new WebSocket("wss://faust.metatron.by/ws")
            var user = this.$auth.user.name
            state.connection.onopen = function(event){
                dispatch('getPatients', user)
                dispatch('open_message', user)
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
                                        element.ai_diagnosis = p_item.ai_diagnosis
                                        element.status = p_item.status
                                        element.picture_count = p_item.pictures_count
                                        element.pictures.forEach(item =>{
                                            if(item.pict_property.type != '-'){
                                                item.pict_property.type = JSON.parse(item.pict_property.type)
                                            }
                                        })
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
                            state.error = false
                        // }
                    }
                    else if(JSON.parse(event.data).type == 'ErrorLoad'){
                        // if(JSON.parse(event.data).count > 0){
                            state.error = true
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
                    else if(JSON.parse(event.data).type == 'downloadOriginal'){
                        var file_name = JSON.parse(event.data).pict_name; 
                        const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
                            const byteCharacters = atob(b64Data);
                            const byteArrays = [];
                          
                            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                              const slice = byteCharacters.slice(offset, offset + sliceSize);
                          
                              const byteNumbers = new Array(slice.length);
                              for (let i = 0; i < slice.length; i++) {
                                byteNumbers[i] = slice.charCodeAt(i);
                              }
                          
                              const byteArray = new Uint8Array(byteNumbers);
                              byteArrays.push(byteArray);
                            }
                          
                            const blob = new Blob(byteArrays, {type: contentType});
                            return blob;
                        }
                        var file_object = new File([b64toBlob(JSON.parse(event.data).pict, 'application/octet-stream')], file_name, {type: 'application/octet-stream'});
                        // console.log(file_object); //Output

                    
                        // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
                        const blobUrl = URL.createObjectURL(file_object);
                        
                        // Create a link element
                        const link = document.createElement("a");
                        
                        // Set link's href to point to the Blob URL
                        link.href = blobUrl;
                        // link.target = "_blank";
                        link.download = file_name;
                        
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
                    else if(JSON.parse(event.data).type == 'waitZip'){
                        state.waitZip = true
                    }
                    else if(JSON.parse(event.data).type == 'downloadZip'){
                        state.waitZip = false
                        var file_name = '' + JSON.parse(event.data).patient_id + '.zip'
                        const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
                            const byteCharacters = atob(b64Data);
                            const byteArrays = [];
                          
                            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                              const slice = byteCharacters.slice(offset, offset + sliceSize);
                          
                              const byteNumbers = new Array(slice.length);
                              for (let i = 0; i < slice.length; i++) {
                                byteNumbers[i] = slice.charCodeAt(i);
                              }
                          
                              const byteArray = new Uint8Array(byteNumbers);
                              byteArrays.push(byteArray);
                            }
                          
                            const blob = new Blob(byteArrays, {type: contentType});
                            return blob;
                        }
                        var file_object = new File([b64toBlob(JSON.parse(event.data).zip, 'application/octet-stream')], file_name, {type: 'application/octet-stream'});
                        // console.log(file_object); //Output

                    
                        // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
                        const blobUrl = URL.createObjectURL(file_object);
                        
                        // Create a link element
                        const link = document.createElement("a");
                        
                        // Set link's href to point to the Blob URL
                        link.href = blobUrl;
                        // link.target = "_blank";
                        link.download = file_name;
                        
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
                    console.log(event.data); //Output
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
                    // else if(state.waitPDF == false){
                    //     var file_name = Math.random().toString(36).substring(6) + '_name.dcm'; //e.g ueq6ge1j_name.pdf
                    //     var file_object = new File([event.data], file_name, {type: 'application/octet-stream'});
                    //     // console.log(file_object); //Output

                    
                    //     // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
                    //     const blobUrl = URL.createObjectURL(file_object);
                        
                    //     // Create a link element
                    //     const link = document.createElement("a");
                        
                    //     // Set link's href to point to the Blob URL
                    //     link.href = blobUrl;
                    //     // link.target = "_blank";
                    //     link.download = file_name;
                        
                    //     // Append link to the body
                    //     document.body.appendChild(link);
                        
                    //     // Dispatch click event on the link
                    //     // This is necessary as link.click() does not work on the latest firefox
                    //     link.dispatchEvent(
                    //         new MouseEvent('click', { 
                    //         bubbles: true, 
                    //         cancelable: true, 
                    //         view: window 
                    //         })
                    //     );
                        
                    //     // Remove link from body
                    //     document.body.removeChild(link);
                    // }
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
                        selectedBreastType: 'R-CC'
                    },
                    file2: {
                        file_name: null,
                        file_prefix: null,
                        file: null,
                        selectedBreastType: 'L-CC'
                    },
                    file3: {
                        file_name: null,
                        file_prefix: null,
                        file: null,
                        selectedBreastType: 'R-MLO'
                    },
                    file4: {
                        file_name: null,
                        file_prefix: null,
                        file: null,
                        selectedBreastType: 'L-MLO'
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
            this.state.status = 'Подготовка файла(1/4)'
            encodeImageFileAsURL(data.form.file1, 'file1', 'R-CC')
            this.state.status = 'Подготовка файла(2/4)'
            encodeImageFileAsURL(data.form.file2, 'file2', 'L-CC')
            this.state.status = 'Подготовка файла(3/4)'
            encodeImageFileAsURL(data.form.file3, 'file3', 'R-MLO')
            this.state.status = 'Подготовка файла(4/4)'
            encodeImageFileAsURL(data.form.file4, 'file4', 'L-MLO')
            this.state.status = 'Подготовка к отправке'
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
        async open_message({commit}, user){
            var message = {
                type: 'open_message',
                user: user
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async sendResult({commit}, data){
            var message = {
                type: 'sendResult',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async sendJson({commit}, data){
            var message = {
                type: 'sendJson',
                data: data
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
        async printPDF({commit}, data){
            var message = {
                type: 'printPDF',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async downloadOriginal({commit}, data){
            var message = {
                type: 'downloadOriginal',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async downloadZip({commit}, data){
            var message = {
                type: 'downloadZip',
                data: data
            }
            this.state.connection.send(JSON.stringify(message))
        },
        async pullNewPict({commit}, data){
            var message = {
                type: 'pullNewPict',
                pict_id: data.pict_id,
                patient_id: data.patient_id,
                file: {
                    file_name: null,
                    file_prefix: null,
                    file: null,
                },

            }
            function encodeImageFileAsURL(file) {
                var reader = new FileReader();
                reader.onloadend = function() {
                    var file_array = reader.result.split(',')
                    message.file = {
                        file_name: file.name,
                        file_prefix: file_array[0] + ',',
                        file: file_array[1]
                    }
                }
                reader.readAsDataURL(file)
            }
            encodeImageFileAsURL(data.form)
            setTimeout(() => {
                this.state.connection.send(JSON.stringify(message))
                var interval = setInterval(() => {
                    if(this.state.connection.bufferedAmount > 0){
                        this.state.status = 'Идет загрузка...'
                    }
                    else{
                        this.state.status = ''
                        clearInterval(interval);
                    }
                }, 100);
            }, "1000")
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