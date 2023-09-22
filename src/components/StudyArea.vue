<template>
  <div>
    <b-modal ref="modal"
      hide-footer
      hide-header
      centered>Você esta sendo redirecionado à área de testes e estudos...</b-modal>
    <body>
      <h1>Área de Estudos e Testes</h1>
      <hr>
      <h2>Aprendendo Vuex</h2>
      <b-input v-model="dado" type="number"></b-input>
      <p v-show="dado">{{ dado | money }}</p>
    </body>

    <div id="content">

    </div>

  </div>
</template>

<script>
export default {

  data() {
    return {
      dado: ''
    }
  },

  mounted() {
    setTimeout(() => {
      this.$refs.modal.hide()
    }, 5000);
    this.$refs.modal.show()      
  },
}
</script>

<style scoped>

body {
  width: 50%;
  margin: auto;
  margin-top: 20px;
}

body h1, h2 {
  text-align: center;
}

#content {
  height: 600px;
}

h2 {
  font-weight: lighter;
}

nav {
  text-align: center;
}

nav a {
  text-decoration: none;
  color: gray;
  margin-left: 10px;
}

</style>