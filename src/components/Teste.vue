<template>
  <div>
    <h1>Utilizando Query</h1>

    <div id="formGroup">
        <b-form-group
            label="Informe o Nome: ">
            <b-form-input size="sm" v-model="nome"></b-form-input>
        </b-form-group>
        <b-form-group
            label="Informe um dado: ">
            <b-form-input size="sm" v-model="dado"></b-form-input>
        </b-form-group>
        <b-button size="sm" @click="sendForm">Enviar Formulário</b-button>
    </div>
    
  </div>
</template>

<script>
export default {
name: 'ConfigurandoRouter',
    data() {
        return {
            nome: '',
            dado: ''
        }
    },
    methods: {
        sendForm() {
            this.$router.push({ name: 'respTeste', query: { nome: this.nome, dado: this.dado }})
        }
    }
}
</script>

<style scoped>

h1 {
    text-align: center;
    margin-top: 30px;
}

#formGroup {
    width: 50%;
    margin: auto;
}

</style>