<template>
  <div id="app">
    <b-modal ref="reserveDataModal"
      hide-header
      hide-footer
      centered>
      <b-card id="cardBody" no-body>
        <b-row>
          <b-col md="7">
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
                Prazo Check In: <b>{{ this.reserveInformations.deadLine }}</b>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="3" class="p-1">
            <b-button class="a" variant="success" :disabled="this.checkInStatus(this.reserveInformations.date)">
              <b-icon icon="check-lg" />
            </b-button>
          </b-col>
          <b-col md="2" class="p-1">
            <b-button class="a" variant="danger" :disabled="this.checkInStatus(this.reserveInformations.date)">
              <b-icon icon="x-lg" />
            </b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-modal>
    <b-container class="mt-5" centralized>
      <b-form-group
        label="Informe seu CPF no campo abaixo: ">
        <b-input type="text" size="sm" v-model="inputedCPF" maxlength="11" centralized></b-input>
        <b-button class="mt-2" @click="searchReserve" variant="info" :disabled="inputedCPF.length < 11">Buscar Reservas</b-button>
      </b-form-group>
    </b-container>
    <b-form-group>
      <b-card id="table" v-for="(reserve, i) in datesReserves" :key="i" class="mt-1" @click="reserveData(reserve)">
        <b-row>
          <b-col md="3">
            <div valid></div>
          </b-col>
          <b-col md="9">
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
      inputedCPF: '11111111111',
      datesReserves: [],
      collaborators: [],
      collaborator: {
        name: ''
      },
      reserveInformations: {
        date: '',
        tableName: '',
        statusCheckIn: '',
        deadLine: ''
      }
    }
  },

  computed: {

  },

  methods: {
    async dbConnectReserves() {
      const res = await this.$http('reserves.json')
      this.reserves = res.data
    },

    reserveData(data) {
      const indTable = Object.values(data)[1].findIndex((p) => p.document === this.inputedCPF)
      this.$refs.reserveDataModal.show()
      this.reserveInformations.date = data.date
      this.reserveInformations.tableName = Object.values(data)[1][indTable].tableName
      this.checkInStatus(data.date)
    },

    status(info) {
      if(info === false) {
        return 'Pendente'
      } else {
        return 'Realizado'
      }
    },

    checkInStatus(date) {
      const limitDate = new Date(date)
      limitDate.setDate(limitDate.getDate() + 3)
      const y = limitDate.getFullYear()
      const m = limitDate.getMonth() + 1
      const d = limitDate.getDate()
      if(new Date() < limitDate) {
        this.reserveInformations.statusCheckIn = 'Pendente'
        this.reserveInformations.deadLine = `${d}/${m}/${y}`
        return false
      } else {
        this.reserveInformations.statusCheckIn = 'Expirado'
        this.reserveInformations.deadLine = `${d}/${m}/${y}`
        return true
      }
    },
    
    async searchReserve() {
      this.datesReserves = []
      const a = Object.values(this.reserves)
      a.forEach((aa) => {
        const indTable = aa.tables.findIndex((p) => p.document === this.inputedCPF)
        if(indTable !== -1 && this.inputedCPF.length === 11) {
          this.datesReserves.push(aa)
        }
      })
      const res = await this.$http('collaborators.json')
      this.collaborators = res.data
      const indPerson = Object.values(this.collaborators).findIndex((p) => p.cpf === this.inputedCPF)
      this.collaborator.name = Object.values(this.collaborators)[indPerson].name
      
      // console.log(`Você tem ${this.datesReserves.length} reservas para realizar o check-in.`)
    }
  },


  created() {
    this.dbConnectReserves()
    this.reserves = []
  }

}
</script>

<style scoped>

#cardBody {
  padding: 15px;
  border: none;
}

[tableName] {
  font-size: 25px;
}

.a {
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

[valid] {
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  position: absolute;
  background-color: rgb(187, 187, 35);
}

[checked] {
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  position: absolute;
  background-color: green;
}

/* #reserveTabInfos {
  height: 200px;
} */

#table {
  width: 600px;
  height: 100px;
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