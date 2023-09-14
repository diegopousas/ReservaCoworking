<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="registrationTab">
    <h3>Cadastro de Colaboradores</h3>
    <div class="buttonsMenuSecondary">
      <ul>
        <router-link to="/register/list" tag="li"><a>Colaboradores Cadastrados</a></router-link>
      </ul>
    </div>
    <div class="alertBox">
      <b-alert
        class="alert"
        :show="message.state"
        :variant="message.variant"
        dismissible
        >{{ message.text }}</b-alert
      >
    </div>
    <label>Nome: </label
      ><b-input id="inpName" size="sm" v-model="collaborator.name" placeholder="Informe seu nome"></b-input>
      <label>CPF: </label
        ><b-input id="inpCPF" size="sm" v-model="collaborator.cpf" placeholder="Informe seu CPF"></b-input>
        <div class="buttons">
          <b-button
          size="sm"
          variant="success"
          class="ml-2 mt-2"
          @click="validator"
          >Cadastrar</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      collaborator: { name: "", cpf: "" },
      message: {
        text: "",
        state: false,
        dismissible: false,
        variant: "",
      },
    };
  },
  props: ["preName"],
  methods: {
    validator() {
      if(this.collaborator.name === '' || this.collaborator.cpf === '') {
        this.message.state = false
        this.message.text = 'Existem campos obrigatórios em branco.'
        this.message.state = true
        this.message.variant = 'warning'
      } else {
        this.newCollaborator()
      }
    },

    clear() {
      this.collaborator.name = "";
      this.collaborator.cpf = "";
      this.id = null;
    },
    newCollaborator() {
      this.$http.post("collaborators.json", this.collaborator).then(() => {
        this.clear();
        this.message.text = "Cadastro realizado com sucesso !";
        this.message.state = true;
        this.message.variant = "success";
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
.alert {
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
}

a {
  color: black;
  cursor: pointer;
}

.alertBox {
  width: 50%;
  height: 50px;
  margin: auto;
  margin-top: 15px;
  margin-bottom: 15px;
}

.buttons {
  text-align: center;
  margin: auto;
  margin-top: 60px;
}

.buttonsMenuSecondary {
  width: 50%;
  margin: auto;
  text-align: center;
}

.buttonsMenuSecondary a {
  text-decoration: none;
}

h3 {
  text-align: center;
}

#inpName {
  text-align: center;
}

#inpCPF {
  text-align: center;
}

.registrationTab {
  width: 80%;
  margin: auto;
  margin-top: 30px;
  font-family: "Poppins", sans-serif;
}

ul li {
  display: inline-block;
}

.active {
  color: red;
}
</style>
