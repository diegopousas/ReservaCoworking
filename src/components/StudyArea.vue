<template>
  <div>
    <b-modal ref="modal"
      hide-footer
      hide-header
      centered>Você esta sendo redirecionado à área de testes e estudos...</b-modal>
    <body>
      <h1>Área de Estudos e Testes</h1>
      <hr>
      <p v-for="produto in produtos" :key="produto.id">{{ produto.nome }} - {{ produto.preco | money }}</p>
      <b-button @click="tamanho">Tamanho</b-button>
    </body>

    <div id="content">

    </div>

  </div>
</template>

<script>
export default {

  methods: {
    tamanho() {
      const a = this.$store.state.produtos
      console.log(a.length)
    }
  },


  computed: {
    produtos() {
      return this.$store.state.produtos
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