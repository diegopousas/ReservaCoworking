<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="registrationTab">
        <label>Nome: </label
        ><b-input id="inpName" size="sm" v-model="collaborator.name"></b-input>
        <label>CPF: </label
        ><b-input id="inpCPF" size="sm" v-model="collaborator.cpf"></b-input>
        <div class="buttons">
          <b-button
            size="sm"
            variant="success"
            class="ml-2 mt-2"
            @click="newCollaborator"
            >Cadastrar</b-button
          >
          <b-button @click="showCollaborators" class="ml-2 mt-2" size="sm"
            >Mostrar Colaboradores</b-button
          >
        </div>
        <!-- <b-list-group>
          <h3>Colaboradores Cadastrados</h3>
          <b-list-group-item v-for="(collab, id) in collaborators" :key="id">
            <strong>Nome: </strong> {{ collab.name }} <br />
            <strong>CPF: </strong> {{ collab.cpf }} <br />
            <strong>ID: </strong> {{ id }} <br />
            <b-button size="sm" class="mt-2" variant="danger">Excluir</b-button>
            <b-button
              size="sm"
              class="mt-2"
              variant="warning"
              @click="editCollaborator(id)"
              >Editar</b-button
            >
          </b-list-group-item>
          <b-button @click="goHome">Voltar</b-button>
        </b-list-group> -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      collaborator: { name: "", cpf: "" },
      collaborators: [],
    };
  },
  props: ["preName"],
  methods: {
    clear() {
      this.collaborator.name = "";
      this.collaborator.cpf = "";
      this.id = null;
    },
    newCollaborator() {
      this.$http
        .post("collaborators.json", this.collaborator)
        .then(() => this.clear());
    },
    showCollaborators() {
      this.$http("collaborators.json").then((res) => {
        this.collaborators = res.data;
      });
    },
    goHome() {
      this.$emit("backingHome");
    },
    editCollaborator(id) {
      this.id = id;
      this.collaborator = { ...this.collaborators[id] };
    },
  },
};
</script>

<style scooped>
.registrationTab {
  
  width: 80%;
  margin: auto;
  font-family: "Poppins", sans-serif;
}

.buttons {
  text-align: center;
  margin: auto;
}

#inpName {
  text-align: center;
}

#inpCPF {
  text-align: center;
}

.active {
  color: red;
}
</style>
