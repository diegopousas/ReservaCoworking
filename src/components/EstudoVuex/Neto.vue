<template>
  <div>
    <h1>Neto</h1>
    <b-form>
      <b-form-group label="Informe um nome: ">
        <b-input type="text" v-model="name"></b-input>
      </b-form-group>
      <b-button variant="info" @click="save">Salvar</b-button>
    </b-form>
    <hr>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'NetoVuex',
  data() {
    return {
      name: ''
    }
  },
  methods: {

    ...mapMutations(['add']),


    save() {
      this.add(this.name)
      this.name = ''
    }
  }
}
</script>

<style scoped>

</style>