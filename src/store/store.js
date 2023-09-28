import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        produtos: []
    },
    getters: {
        tamanho(state) {
            return state.produtos.length
        }
    }
})