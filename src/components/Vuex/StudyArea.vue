<template>
  <div class="mt-5">
    <h1>Sacola</h1>
    <b-row>
      <b-col md="6">
        <b-form-group label="Insira um produto: ">
          <b-input v-model="prod"></b-input>
        </b-form-group>
      </b-col>
      <b-col md="3">
        <b-form-group label="Informe a quantidade: ">
          <b-input type="number"></b-input>
        </b-form-group>
      </b-col>
      <b-col md="3">
        <b-form-group label="Informe um valor: ">
          <b-input type="number"></b-input>
        </b-form-group>
      </b-col>
    </b-row>
      <b-button variant="success">Salvar</b-button>
        <Neto class="mt-5"/>
  </div>
</template>

<script>
import Neto from './Carrinho.vue'
export default {
  data() {
    return {
      prod: ''
    }
  },
  components: { Neto }
}
</script>

<style scoped>

div {
  text-align: center;
}

</style>