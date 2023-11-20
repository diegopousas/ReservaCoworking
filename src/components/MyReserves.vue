<template>
  <div>
    <b-collapse id="collapse" v-model="showReserves">
      <div id="alertBox">
        <b-alert :show="alert.status" class="m-0" :id="alert.animation" :variant="alert.variant">{{ alert.message }}</b-alert>
      </div>
      <b-container>
        <b-form-group
          label="Insira seu CPF para gerenciar suas reservas "
          centralized>
          <b-input :id="noReserves" size="sm" inputs v-model="inputedCPF" centralized maxlength="11"></b-input>
          <b-button class="mt-2" variant="info" @click="listReserves" :disabled="!inputs.document.status">Buscar Reservas</b-button>
        </b-form-group>
      </b-container>
    </b-collapse>
    <b-card v-if="!showReserves" id="collaboratorData" img-src="..\col.png" img-start>
      <b-row class="mt-3">
        <b-col md="6">
          {{ collaboratorData.name }}
        </b-col>
        <b-col md="6">
          {{ collaboratorData.document | cpf }}
        </b-col>
      </b-row>
    </b-card>
    <b-button centralized v-if="!showReserves" @click="clearSearch">Voltar</b-button>
      <b-card centralized id="tableData" class="mt-2 overflow-hidden" v-for="reserve in reservesCollaborator" :key="reserve.date" no-body>
        <b-row id="rowData">
          <b-col md="1" :id="statusCheckIn(reserve.table.checkIn)">
          </b-col>
          <b-col md="2" completeFill>
            {{ reserve.date | date }}
          </b-col>
          <b-col md="3" completeFill>
            {{ reserve.table.tableName }}
          </b-col>
          <b-col md="3" completeFill>
            {{ checkInMessage(reserve.table.checkIn) }}
          </b-col>
          <b-col completeFill class="mr-1">
            <span>
              <b-button buttonCard :disabled="reserve.table.checkIn" v-b-tooltip.hover title="Depois de realizado check in, a reserva não pode ser cancelada." @click="cancelReserve">Cancelar</b-button>
            </span>
          </b-col>
        </b-row>
      </b-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      teste: '',
      collaboratorData: {
        status: false,
        name: '',
        document: ''
      },
      collaborators: [],
      inputedCPF: '',
      reserves: [],
      reservesCollaborator: [],
      showReserves: true,
      inputs: {
        document: {
          status: false
        }
      },
      noReserves: '',
      alert: {
        status: false,
        message: '',
        variant: '',
        animation: ''
      }
    }
  },

  created() {
    this.dbConnectReserves()
    this.dbConnectCollaborators()
  },

  methods: {
    async dbConnectReserves() {
      const res = await this.$http('reserves.json')
      this.reserves = res.data
    },

    async dbConnectCollaborators() {
      const res = await this.$http('collaborators.json')
      this.collaborators = res.data
    },

    async listReserves() {
      Object.values(this.reserves).forEach((res) => {
        const indTable = res.tables.findIndex((t) => t.document === this.inputedCPF)
        if(indTable !== -1 && this.inputedCPF.length === 11) {
          this.reservesCollaborator.push({date: res.date, table: res.tables[indTable]})
        }
        this.showReserves = false
        this.collaboratorData.status = !this.collaboratorData.status
      })
    },

    isRegistered() {
      const registerTest = Object.values(this.collaborators).findIndex((p) => p.cpf === this.inputedCPF)
      const reserves = Object.values(this.reserves)
      reserves.forEach((p) => {
        const indTable = p.tables.findIndex((t) => t.document === this.inputedCPF)
        if(indTable === -1) {
          console.log('quebrou')
          return
        }
      })
      if(registerTest === -1) {
        this.noReserves = 'shakeX'
        this.alert.status = true
        this.alert.animation = 'fadeIn'
        this.alert.message = 'Para o CPF digitado não constam reservas.'
        this.alert.variant = 'warning'
        this.inputs.document.status = false
        return
      }
    },

    cancelReserve() {
      console.log('cancelado')
    },

    clearSearch() {
      this.showReserves = !this.showReserves
      this.reservesCollaborator = []
      this.inputedCPF = ''
      this.inputs.document.status = false
    },

    statusCheckIn(data) {
      if(data === true) {
        return 'checked'
      } else {
        return 'pending'
      }
    },

    checkInMessage(data) {
      if(data === true) {
        return 'Realizado'
      } else if(data === false) {
        return 'Pendente'
      } else {
        return 'Expirado'
      }
    }
  },

  watch: {
    'inputedCPF': function () {
      if(this.inputedCPF.length === 11) {
        this.isRegistered()
      }




      // const reserves = Object.values(this.reserves)
      // reserves.forEach((p) => {
      //   const indTable = p.tables.findIndex((t) => t.document === this.inputedCPF)
      //   if(indTable === -1) {
      //       this.noReserves = 'shakeX'
      //       this.alert.status = true
      //       this.alert.animation = 'fadeIn'
      //       this.alert.message = 'Para o CPF digitado não constam reservas.'
      //       this.alert.variant = 'warning'
      //       this.inputs.document.status = false
      //       return
      //     } else {
      //       this.alert.status = false
      //       this.alert.animation = 'fadeOut'
      //       this.noReserves = ''
      //     }
      // })
      // if(this.inputedCPF.length === 11 && indCollaborator === -1) {
      //   this.noReserves = 'shakeX'
      //     this.alert.status = true
      //     this.alert.animation = 'fadeIn'
      //     this.alert.message = 'Para o CPF digitado não constam reservas.'
      //     this.alert.variant = 'warning'
      //     this.inputs.document.status = false
      //     return
      // }
      //   this.collaboratorData.name = Object.values(this.collaborators)[indCollaborator].name
      //   this.collaboratorData.document = Object.values(this.collaborators)[indCollaborator].cpf
      //   this.inputs.document.status = true
      //   const a = Object.values(this.reserves)
      //   a.forEach((p) => {
      //     const indTable = p.tables.findIndex((t) => t.document === this.inputedCPF)
      //     if(indTable === -1) {
      //       this.noReserves = 'shakeX'
      //       this.alert.status = true
      //       this.alert.animation = 'fadeIn'
      //       this.alert.message = 'Para o CPF digitado não constam reservas.'
      //       this.alert.variant = 'warning'
      //       this.inputs.document.status = false
      //       return
      //     } else {
      //       this.alert.status = false
      //       this.alert.animation = 'fadeOut'
      //       this.noReserves = ''
      //     }
      //   })
      // } else if(this.inputedCPF.length === 0) {
      //   this.alert.status = false
      //   this.alert.animation = 'fadeOut'
      //   this.noReserves = ''
      // }
    }
  }

}
</script>

<style>

[buttonCard] {
  background-color: transparent;
  color: gray;
}

#checked {
  background-color: green;
  height: 100%;
}

#expired {
  background-color: gray;
  height: 100%;
}

#pending {
  background-color: #bbbb23;
  height: 100%;
}

#rowData {
  height: 100%;
}

[completeFill] {
  width: 100%;
  margin: auto;
}

@media(max-width: 990px) {

  #alertBox {
    height: 50px;
    margin: 7px;
  }

  [inputs] {
    width: 200px;
    margin: auto;
  }

  #collaboratorData {
    width: 60%;
    height: 100px;
    border: 2px solid rgb(158, 158, 158);
    margin: auto;
    margin-top: 20px;
  }

  #tableData {
    height: 100px;
  }
}
#alertBox {
  height: 50px;
  margin: 7px;
}

[centralized] {
  margin: auto;
  text-align: center;
}

[inputs] {
  width: 200px;
  margin: auto;
}

#shakeX {
  animation: shakeX; 
  animation-duration: 1s;
}

#tableData {
  height: 50px;
}

#fadeIn {
  animation: fadeIn;
  animation-duration: 1s;
}

#fadeOut {
  animation: fadeOut;
  animation-duration: 1s;
}

#collaboratorData {
  width: 60%;
  height: 100px;
  border: 2px solid rgb(158, 158, 158);
  margin: auto;
  margin-top: 20px;
}

</style>