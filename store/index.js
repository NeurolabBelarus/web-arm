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
            state.connection = new WebSocket("wss://localhost:8080/ws")
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
        sendMessage(state){
            state.connection.send('test')
        }
    },
    getters: {
    
    },
    actions: {
        async openConnection({commit}){
            commit('openConnection')
        },
        async sendMessage({commit}){
            commit('sendMessage')
        }
    },
})

export default store