import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        produtos: [
            { id: 1, nome: 'Produto 1', quantidade: 2, preco: 10.99 },
            { id: 2, nome: 'Produto 2', quantidade: 5, preco: 1.00 }
        ]
    }
})