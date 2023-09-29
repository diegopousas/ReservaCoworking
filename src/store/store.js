import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        collaborators: []
    },
    getters: {
        size(state) {
            return state.collaborators.length
        },
        name(state) {
            return state.collaborators
        } 
    },
    mutations: {
        add(state, info) {
            state.collaborators.push(info)
        }
    }
})