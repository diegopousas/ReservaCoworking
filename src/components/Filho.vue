<template>
  <div>
    <Neto />
  </div>
</template>

<script>
import Neto from './Neto.vue'
import { mapGetters } from 'vuex';
export default {
name: 'ConfigurandoRouter',
  components: { Neto },
  computed: {
  ...mapGetters(['tamanho'])
}

}
</script>

<style>

</style>