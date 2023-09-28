<!-- eslint-disable vue/multi-word-component-names -->
<template>

<div>
  <b-form>
    <h3>Cadastro de Colaboradores</h3>
      <b-alert :variant="message.variant" :dimissible="message.dimissible" :show="message.state" >{{ message.text }}</b-alert>
    <b-form-group>
      <b-form-input id="inpName" class="mt-3" v-model="collaborator.name" placeholder="Informe seu nome"></b-form-input>
      <b-form-input id="inpCPF" type="number" class="mt-3" v-model="collaborator.cpf" placeholder="Informe seu CPF"></b-form-input>
      <div class="buttons">
        <b-button size="sm" variant="success" class="ml-2 mt-2" @click="validator" v-b-tooltip.bottom :title="message.button.register" :disabled="disableButtonRegister">Cadastrar</b-button>
        <b-button size="sm" variant="info" class="ml-2 mt-2" @click="showCollaborators" v-b-tooltip.bottom :title="message.button.registers" :disabled="disableButtonRegisterList">Visualizar Cadastros</b-button>
      </div>
    </b-form-group>
    <b-modal ref="registerList">
      <div>
          <b-table>
          </b-table>
      </div>
    </b-modal>
  </b-form>
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
        dimissible: false,
        variant: "",
        button: { register: '', registers: ''} 
      },
      cols: []
    };
  },
  props: ["preName"],
  methods: {
    validator() {
      if(this.collaborator.name === "" || this.collaborator.cpf === "") {
        this.message.state = false;
        this.message.text = "Existem campos obrigatórios em branco.";
        this.message.state = true;
        this.message.variant = "warning";
      } else {
        this.newCollaborator();
      }
    },
    clear() {
      this.collaborator.name = "";
      this.collaborator.cpf = "";
      this.id = null;
    },
    newCollaborator() {
      let obj = Object.values(this.cols)
      let isRegistered = obj.some(document => document.cpf === this.collaborator.cpf)
      if(isRegistered) {
        this.message.state = true
        this.message.variant = 'warning'
        this.message.text = 'O CPF informado já foi cadastrado, faça sua reserva.'
     } else {
        this.$http.post("collaborators.json", this.collaborator).then(() => {
          this.clear();
          this.message.text = "Cadastro realizado com sucesso !";
          this.message.variant = "success";          
          this.message.state = true;
        setTimeout(() => {
          this.message.state = false
          this.$router.push('/reserves')
          }, 3000);
        });
      }
    },
    goHome() {
      this.$emit("backingHome");
    },
    editCollaborator(id) {
      this.id = id;
      this.collaborator = { ...this.collaborators[id] };
    },
    setMessageButton(button) {
      if(button === 'register') {
        if(!this.collaborator.name && !this.collaborator.cpf) {
          this.message.button.register = 'Os campos nome e CPF devem estar preenchidos...'
        } else if(!this.collaborator.cpf) {
          this.message.button.register = 'O campo CPF é obrigatório, favor preenche-lo...'
        } else if(!this.collaborator.name) {
          this.message.button.register = 'O campo nome é obrigatório, favor preenche-lo...'
        } else {
          this.message.button.register = 'Cadastrar'
        }
      } else if (button === 'registers'){
        if(this.cols)
        this.message.button.registers = 'Não existem colaboradores cadastrados.'
      }
    },
    connectDB() {
      this.$http('collaborators.json')
        .then((res) => this.cols = res.data)
    },
    showCollaborators() {
      this.$refs.registerList.show()
      this.$http('collaborators.json')
        .then((res) => {
          this.cols = res.data
        })
    },
  },
  computed: {
    disableButtonRegister() {
      if(this.collaborator.name && this.collaborator.cpf) {
        this.setMessageButton('register')
        return false
      } else {
        this.setMessageButton('register')
        return true
      }
    },
    disableButtonRegisterList() {
      if(this.cols == null) {
        this.setMessageButton()
        return true
      } else {
        this.setMessageButton()
        return false
      }
    }
  },

  created() {
    this.connectDB()
  }

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
  margin-top: 30px;
}

.buttonsMenuSecondary {
  width: 50%;
  margin: auto;
  text-align: center;
}

#buttonRegisters {
  background-color: white;
  color: black;
}

.buttonsMenuSecondary a {
  text-decoration: none;
}

h3 {
  text-align: center;
  margin-top: 30px;
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


</style>
