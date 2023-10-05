<template>
  <div id="body">
    <div>
      <h1>Carrinho</h1>
        <b-button>Finalizar !</b-button>
    </div>
      <Resumo id="summary"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Resumo from './Resumo.vue'
export default {
  name: 'CarrinhoVuex',
  components: { Resumo },
}
</script>

<style scoped>

#body {
  height: 300px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

#summary {
  margin-top: 100px;
  border-top: 1px solid black;
}


h1 {
    text-align: center;
}

ul {
  height: 100px;
}

li {
  display: inline-block;
}

</style>