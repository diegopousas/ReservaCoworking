<template>
  <div id="body">
    <b-collapse id="collapse" v-model="showReserves">
      <div id="alertBox">
        <b-alert :show="alert.status" class="m-0" :id="alert.animation" :variant="alert.variant">{{ alert.message }}</b-alert>
      </div>
      <b-container>
        <b-form-group
          label="Insira seu CPF para gerenciar suas reservas "
          centralized>
          <b-input :id="noReserves" size="sm" inputs v-model="inputedCPF" centralized maxlength="11"></b-input>
          <b-button class="mt-2" variant="info" @click="listReserves">Buscar Reservas</b-button>
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
              <b-button buttonCard :disabled="reserve.table.checkIn" v-b-tooltip.hover title="Depois de realizado check in, a reserva não pode ser cancelada." @click="cancelReserve(reserve)">Cancelar</b-button>
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
          this.collaboratorData.document = this.inputedCPF
          this.collaboratorData.name = res.tables[indTable].person
        }
        this.showReserves = false
        this.collaboratorData.status = !this.collaboratorData.status
      })
    },

    isRegistered() {
      const registerTest = Object.values(this.collaborators).findIndex((p) => p.cpf === this.inputedCPF)
      const reserves = Object.values(this.reserves)
      if(registerTest !== -1) {
        const positions = []
        for(let i = 0; i < reserves.length; i++) {
          const test = Object.values(this.reserves)[i].tables.findIndex((t) => t.document === this.inputedCPF)
          positions.push(test)
        }
        let hasReserve = positions.filter(table => table > -1)
        if(hasReserve.length === 0) {
          this.noReserves = 'shakeX'
          this.alert.status = true
          this.alert.animation = 'fadeIn'
          this.alert.message = 'Para o CPF digitado não constam reservas.'
          this.alert.variant = 'warning'
          this.inputs.document.status = false
        }
      } else {
          this.noReserves = 'shakeX'
          this.alert.status = true
          this.alert.animation = 'fadeIn'
          this.alert.message = 'O CPF informado não tem um cadastro em nossa base.'
          this.alert.variant = 'warning'
          this.inputs.document.status = false
      }
    },

    async cancelReserve(a) {
      const indDate = Object.values(this.reserves).findIndex((r) => r.date === a.date)
      const id = Object.keys(this.reserves)[indDate]
      const indTable = Object.values(this.reserves)[indDate].tables.findIndex((t) => t.document === this.inputedCPF)
      await this.$http.patch(`/reserves/${id}/tables/${indTable}/.json`, { avaiable: true, person: '', document: '', checkIn: false})
      console.log('deletado')
      this.dbConnectReserves()
      console.log(this.reserves)
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
      this.alert.status = false
      this.alert.animation = 'fadeOut'
      if(this.inputedCPF.length === 11) {
        this.isRegistered()
      }
    }
  }
}
</script>

<style>

#body {
  animation: fadeIn;
  animation-duration: 1s;
}

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