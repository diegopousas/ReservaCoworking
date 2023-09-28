<template>
  <div>
    <b-modal ref="modal"
      hide-footer
      hide-header
      centered>Você esta sendo redirecionado à área de testes e estudos...</b-modal>

    <div id="content">
      <b-form-group
        label="Insira um dado aqui: ">
        <b-input 
          v-model="description"/>
      </b-form-group>
      <b-form-group
        label="Insira um valor aqui: ">
        <b-input 
          v-model="value"/>
      </b-form-group>
      <b-button @click="save" variant="primary">Save</b-button>
      <b-button @click="show" class="ml-1">Mostrar</b-button>
      <hr class="mt-5">
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      description: '',
      value: ''
    }
  },
  methods: {

    clear() {
      this.description = ''
      this.value = ''
    },

    save() {
      this.$store.state.produtos.push({ description: this.description, value: this.value })
      this.clear()
    },

    show() {
      const a = this.$store.state.produtos
      console.log(a)
    }
  },


  computed: {
    produtos() {
      return this.$store.state.produtos
    }
  },

  // mounted() {
  //   setTimeout(() => {
  //     this.$refs.modal.hide()
  //   }, 5000);
  //   this.$refs.modal.show()      
  // },
}
</script>

<style scoped>

body h1, h2 {
  text-align: center;
}

#content {
  height: 300px;
  margin-top: 40px;
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