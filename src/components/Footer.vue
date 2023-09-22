<template>
  <div id="body">
    <button @click="areaEstudos">Desenvolvido por Diego Vieira Pousas em 2023 ©</button>
  </div>
</template>

<script>
export default {
  name: 'FooterComp',
  methods: {
    areaEstudos() {
      this.$router.push('/study')
    }
  }
}
</script>

<style scoped>
#body {
    text-align: center;
    font-size: 12px;
}

button {
  border: none;
  background-color: white;
}
</style>