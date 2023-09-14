<template>
  <div>
    <b-list-group>
      <h3>Colaboradores Cadastrados</h3>
      <div v-if="collaborators === null" class="alertBox">
        <b-alert show>Nenhum cadastro encontrado !</b-alert>
      </div>
      <div class="itens">
        <b-list-group-item v-for="(collab, id) in collaborators" :key="id">
          <strong>Nome: </strong> {{ collab.name }} <br />
          <strong>CPF: </strong> {{ collab.cpf }} <br />
          <b-button size="sm" class="mt-2 ml-2" variant="danger">Excluir</b-button>
          <b-button size="sm" class="mt-2 ml-2" variant="warning" @click="editCollaborator(id)">Editar</b-button
          >
        </b-list-group-item>
      </div>
    </b-list-group>
  </div>
</template>

<script>
export default {
name: 'ReservesComp',
data() {
  return {
    collaborators: []
  }
},
mounted() {
  this.showCollaborators()
},
methods: {
  showCollaborators() {
      this.$http("collaborators.json").then((res) => {
      this.collaborators = res.data;
    });
  }
},
}
</script>

<style scoped>

h3 {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
}

.alertBox {
  width: 80%;
  height: 50px;
}

.itens {
  width: 50%;
  margin: auto;
  text-align: center;
}


</style>