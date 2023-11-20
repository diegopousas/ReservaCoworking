<template>
  <div id="app">
    <b-modal ref="reserveDataModal"
      hide-header
      hide-footer
      centered
      @hide="teste">
      <b-card id="cardBody" no-body>
        <b-row>
          <b-col md="9">
            <p headerModal>{{ reserveInformations.date | date }} {{ reserveInformations.date | completeDate }}</p>
            <b-row class="mt-1">
              <b-col tableName>
                <b>{{ reserveInformations.tableName }}</b>
              </b-col>
            </b-row>
            <b-row class="mt-1">
              <b-col md="12">
                Status Check-In: <b>{{ reserveInformations.statusCheckIn }}</b>
              </b-col>
            </b-row>
            <b-row class="mt-1">
              <b-col>
                Prazo Check In: <b>{{ reserveInformations.deadLine }}</b>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="3" class="p-1">
            <b-button class="buttonCheck" variant="success" :disabled="reserveInformations.statusCheckIn === 'Realizado'" @click="checkIn()">
              <b-icon icon="check-lg" />
            </b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-modal>
    <b-container class="mt-5" centralized>
      <b-form-group
        label="Informe seu CPF no campo abaixo: ">
        <b-input type="text" size="sm" v-model="inputedCPF" maxlength="11" centralized id="inpCPF" :disabled="datesReserves.length > 0"></b-input>
        <b-alert id="alert" :variant="alert.variant" :show="alert.status" class="mt-3">{{ alert.message }}</b-alert>
        <b-button class="mt-3 mr-1" @click="searchReserves" variant="info" :disabled="inputedCPF.length < 11" v-show="datesReserves.length === 0">Buscar Reservas</b-button>
        <b-button class="mt-3" variant="warning" v-show="datesReserves.length > 0" @click="datesReserves = [], inputedCPF = ''">Nova Busca</b-button>
      </b-form-group>
    </b-container>
    <b-form-group>
      <b-card id="table" v-for="(reserve, i) in datesReserves" :key="i" class="mt-1 overflow-hidden" @click="reserveData(reserve)">
        <b-row alignOnCenter>
          <b-col md="1">
            <div id="checked"></div>
          </b-col>
          <b-col md="9" class="text-center">
            {{ reserve.date | date }}
          </b-col>
        </b-row>
      </b-card>
    </b-form-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reserves: '',
      inputedCPF: '',
      datesReserves: [],
      collaborators: [],
      collaborator: {
        name: ''
      },
      reserveInformations: {
        reserves: [],
        date: '',
        tableName: '',
        statusCheckIn: '',
        deadLine: ''
      },
      selectedDate: '',
      alert: {
        status: false,
        variant: '',
        message: ''
      }
    }
  },

  methods: {

    async teste() {
      console.log('chamou')
      for(let i = 0; i < this.datesReserves; i++) {
        console.log(this.datesReserves[i])
      }
    },

    // async deleteReserves() {
    //   const res = await this.$http.delete('reserves.json')
    //     console.log('deletados')
    // },

    async dbConnectReserves() {
      const res = await this.$http('reserves.json')
      this.reserves = res.data
    },
    
    async checkIn() {
      const indDate = Object.values(this.reserves).findIndex((r) => r.date === this.reserveInformations.date)
      const id = Object.keys(this.reserves)[indDate]
      const idRes = Object.values(this.reserves)[indDate]
      this.selectedDate = Object.values(this.reserves)[indDate]
      const indTable = Object.values(this.selectedDate)[2].findIndex((p) => p.document === this.inputedCPF)
      const checking = await this.$http.patch(`/reserves/${id}/tables/${indTable}/.json`, { checkIn: true })
      // this.checkInStatus(this.selectedDate.date, idRes)
      this.datesReserves = checking
      this.$refs.reserveDataModal.hide()
    },

    reserveData(data) {
      const indTable = Object.values(data)[2].findIndex((p) => p.document === this.inputedCPF)
      this.$refs.reserveDataModal.show()
      this.reserveInformations.date = data.date
      this.reserveInformations.tableName = Object.values(data)[2][indTable].tableName
      this.checkInStatus(data.date, data)
    },

    checkInStatus(date, data) {
      const ind = Object.values(data)[2].findIndex((p) => p.document === this.inputedCPF)
      const checked = Object.values(data)[2][ind].checkIn
      const limitDate = new Date(date)
      limitDate.setDate(limitDate.getDate() + 8)
      const y = limitDate.getFullYear()
      const m = limitDate.getMonth() + 1
      const d = limitDate.getDate()
      if(checked) {
        this.reserveInformations.statusCheckIn = 'Realizado'
        this.reserveInformations.deadLine = '-'
      } else if(new Date() < limitDate) {
        this.reserveInformations.statusCheckIn = 'Pendente'
        this.reserveInformations.deadLine = `${d}/${m}/${y}`
        return false
      } else {
        this.reserveInformations.statusCheckIn = 'Expirado'
        this.reserveInformations.deadLine = `${d}/${m}/${y}`
        return true
      }
    },
    
    async searchReserves() {
      this.datesReserves = []
      this.alert.status = false
      this.alert.message = ''
      if(this.reserves === null) {
        this.alert.status = true
        this.alert.variant = 'info'
        this.alert.message = 'Não constam reservas para o CPF digitado.'
      } else {
        const reserves = Object.values(this.reserves)
        const limitDate = new Date()
        limitDate.setDate(limitDate.getDate() - 8)
        reserves.forEach((res) => {
          const indTable = res.tables.findIndex((p) => p.document === this.inputedCPF)
          if(indTable !== -1 && this.inputedCPF.length === 11 && new Date(res.date) >= limitDate) {
            this.datesReserves.push(res)
          }
        })
        if(this.datesReserves.length == 0) {
          this.alert.status = true
          this.alert.variant = 'info'
          this.alert.message = 'Não constam reservas para o CPF digitado.'
        }
        const res = await this.$http('collaborators.json')
        this.collaborators = res.data
        const indPerson = Object.values(this.collaborators).findIndex((p) => p.cpf === this.inputedCPF)
        if(indPerson !== -1) {
          this.collaborator.name = Object.values(this.collaborators)[indPerson].name      
        }
      }
    }
  },

  created() {
    this.dbConnectReserves()
    this.reserves = []
  },

  computed: {
    actualStatus() {
      const a = this.$http('reserves')
      console.log(a.data)
      return a.data
    }
  },
  
  watch: {
    'inputedCPF': function() {
      if(this.inputedCPF.length < 11) {
        this.alert.status = false
      }
    }
  }
}
</script>

<style scoped>

#checked {
  background-color: blue;
  height: 100%;
}

@media(max-width: 990px) {
  #table {
    width: 600px;
    border-radius: 5px;
    height: 100px;
    margin: auto;
    cursor: pointer;
  }
  #cardBody {
    padding: 15px;
    border: none;
  }
  .a {
    width: 100%;
    margin: auto;
    height: 100%;
    font-weight: bold;
  }
  #status {
    width: 25px;
    height: 25px;
    border-radius: 12.5px;
    position: absolute;
  }
  #inpCPF {
    width: 200px;
    margin: auto;
  }
}

[alignOnCenter] {
  margin: auto;
  height: 100%;
}

#alert {
  width: 50%;
  margin: auto;
}

#inpCPF {
  width: 200px;
  margin: auto;
}

#cardBody {
  padding: 15px;
  border: none;
}

[tableName] {
  font-size: 25px;
}

.buttonCheck {
  width: 100%;
  margin: auto;
  height: 100%;
  font-weight: bold;
}

[col] {
  padding: 0;
}

[centralized] {
  text-align: center;
}

#status {
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  position: absolute;
}

#valid {
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  position: absolute;
  background-color: rgb(187, 187, 35);
}

/* #reserveTabInfos {
  height: 200px;
} */

#table {
  width: 600px;
  height: 100px;
  border-radius: 5px;
  margin: auto;
  cursor: pointer;
}

[headerModal] {
  font-size: 20px;
  font-weight: bold;
  font: 'Montserrat';
}

/* [modalBody] {
  font-size: 15px;
  color: gray;
  text-align: center;
  width: 700px;
  height: 500px;
} */

</style>