<template>
  <div>
    <h1>Filho</h1>
    <p>{{ tamanho }}</p>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
name: 'ConfigurandoRouter',

  computed: {
  ...mapGetters(['tamanho'])
}

}
</script>

<style>

</style>