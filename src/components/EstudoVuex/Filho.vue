<template>
  <div>
    <h1>Filho</h1>
    <b-form>
      <b-form-group label="O nome informado foi: ">
        <p>O nome aparecerá aqui...</p>
      </b-form-group>
      <b-form-group label="O valor informado foi: ">
        <p>A base tem no total {{ size }} cadastro(s).</p>
        <p v-for="(nam, i) in name" :key="i">{{ nam }}</p>

      </b-form-group>
      <b-form-group label="Temos cadastradas: ">
      </b-form-group>
    </b-form>
    <hr>
    <Neto />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Neto from './Neto.vue'
export default {
    name: 'FilhoVuex',
    components: { Neto },
    computed: mapGetters(['size','name'])
}
</script>

<style scooped>

</style>