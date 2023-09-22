<template>
  <div>
    <b-list-group>
      <h3>Colaboradores Cadastrados</h3>
      <div v-show="alert.status" class="alertBox">
        <b-alert :show="alert.status">{{ alert.message }}</b-alert>
      </div>
      <div class="itens">
        <b-list-group-item v-for="(collab, id) in collaborators" :key="id">
          <strong>Nome: </strong> {{ collab.name }} <br />
          <strong>CPF: </strong> {{ collab.cpf }} <br />
          <b-button size="sm" class="mt-2 ml-2" variant="danger" @click="deleteCollaborator(id)">Excluir</b-button>
          <b-button size="sm" class="mt-2 ml-2" variant="warning" disabled>Editar</b-button
          >
        </b-list-group-item>
        <b-modal ref="modalDelete" show
          ok-variant="danger"
          cancel-variant="info"
          ok-title="Sim"
          cancel-title="Não"
          no-close-on-esc
          hide-header-close
          @ok="teste"
          >
          <p>Deseja realmente excluir o colaborador selecionado ?</p>
        </b-modal>

      </div>
    </b-list-group>
  </div>
</template>

<script>
export default {
name: 'ReservesComp',
  data() {
    return {
      id: '',
      collaborators: [],
      delete: false,
      alert: {
        status: false,
        message: '',
        variant: '',
        time: ''
      }
    }
  },
  mounted() {
    this.showCollaborators()
  },
  methods: {

    showAlert(message, variant, time) {
      this.alert.time = time
      setTimeout(() => {
        this.alert.message = message
        this.alert.variant = variant      
      }, time)
    },
    showCollaborators() {
        this.$http("collaborators.json").then((res) => {
          this.collaborators = res.data;
          if(this.collaborators === null) {
            this.showAlert('true', 'Nenhum cadastro encontrado !', 'info', 2000)
          }
      });
    },
    deleteCollaborator(id) {
      this.$refs.modalDelete.show()
      this.id = id
    },

    teste() {
      this.$http.delete(`/collaborators/${this.id}.json`)
      console.log('deletado')
      setTimeout(() => {
        this.showCollaborators()
      }, 1000);
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