import Vue from 'vue'
import Vuex from 'vuex'
// import h_fields_json from '~/static/h_fields.json'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    state: {
        connection: null
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
            }

            state.connection.onclose = function(event){
                console.log(event)
                console.log("Closed")
            }
        },
        sendMessage(state, data){
            // try {
            //     this.$axios.post('/api/file',
            //     data,
            //     {
            //       headers: {
            //           'Content-Type': 'multipart/form-data'
            //       }
            //     }).then((response) => {
            //     })
            //     .catch((err) => {
            //         console.error(err);
            //     });
            // } catch (error) {
            //     console.log('Error:', error)
            // }
            state.connection.send(data)
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
        }
    },
})

export default store