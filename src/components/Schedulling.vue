<template>
  <div id="app">
    <b-modal ref="modalReserve"
      hide-header
      hide-footer
      centered
      @hide="closedModal">
      <div id="modalReserve" centralized>
        <b-card :title="modalDate.title">
          <b-card-text>Data: {{ formatter(inputedDate) }}</b-card-text>
          <b-card-text bold>{{ modalDate.avaiable == true ? 'Disponível' : 'Indisponível' }}</b-card-text>
        </b-card>
        <b-alert :variant="this.alertModal.variant" :show="this.alertModal.status" class="mt-2">{{ this.alertModal.text }}</b-alert>
        <b-form-input id="inpName" centralized type="text" v-model="inputedName" size="sm" class="mt-3" v-if="reserveModalStyle.inputStatus" :placeholder="reserveModalStyle.message.placeName">{{ reserveModalStyle.message.name }}</b-form-input>
        <b-form-group smallest
        description="Digite somente os números do seu CPF"
        centralized
        class="mt-1">
        <b-input-group prepend="CPF" size="sm" class="mt-1">
          <b-form-input centralized :placeholder="reserveModalStyle.placeholder" type="text" v-model="inputedCPF" :disabled="!modalDate.avaiable" maxlength="11"></b-form-input>
          <b-input-group-append>
              <b-button :variant="reserveModalStyle.variant" :disabled="registerButtonReserveStatus " @click="register(reserveModalStyle.value)">{{ reserveModalStyle.value }}</b-button>
            </b-input-group-append>
          </b-input-group>
          <p class="message" v-if="reserveModalStyle.status">{{ reserveModalStyle.message.text }}</p>
        </b-form-group>
      </div>
    </b-modal>
    <b-container id="tableDateReserve" centralized class="mt-5">
      <b-form-group label="Informe a data da Reserva" id="dateGroup">
        <b-input type="date" v-model="inputedDate" :min="todayFormatString" centralized size="sm"></b-input>
      </b-form-group>
    </b-container>
    <b-alert :show="alertReserve.status" class="mt-2">{{ alertReserve.message }}</b-alert>
    <div id="groupSeasons">
      <b-row>
        <b-col md="6">
          <b-card id="seasons" v-for="(season, i) in tables" :key="i" v-show="i < 5" @click="preReserve(season.tableName, season.avaiable, season, i)">
            <b-row>
              <b-col md="1">
                <b-button id="status" :variant="buttonStatus(season.person)"></b-button>
              </b-col>
              <b-col md="6">
                {{ season.tableName }}
              </b-col>
              <b-col md="4" small>
                {{ season.person ? 'Indisponível' : 'Disponível' }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col md="6">
          <b-card id="seasons" v-for="(season, i) in tables" :key="i" v-show="i > 4" @click="preReserve(season.tableName, season.avaiable, season, i)">
            <b-row>
              <b-col md="1">
                <b-button id="status" :variant="buttonStatus(season.person)"></b-button>
              </b-col>
              <b-col md="5">
                {{ season.tableName }}
              </b-col>
              <b-col md="6" small>
                {{ season.person ? 'Indisponível' : 'Disponível' }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
</div>
</template>

<script>
export default {
  name: "SchedulingComp",
  data() {
    return {
      bookingHistory: [],
      workSeasons: {},
      collaborators: [],
      selectedStatus: '',
      inputedDate: '',
      inputedName: '',
      inputedCPF: '',
      reserves: [],
      search: [],
      tables: [],
      buttonColor: 'success',
      modalDate: {
        title: '',
        avaiable: '',
        date: ''
      },
      alertReserve: {
        status: false,
        message: ''
      },
      alertModal: {
        status: false,
        text: '',
        variant: 'success'
      },
      reserveModalStyle: {
        validator: false,
        inputStatus: false,
        status: true,
        variant: 'info',
        value: 'Reservar',
        placeholder: 'Informe seu CPF para reservar esta mesa.',
        message: {
          status: false,
          text: '',
          placeName: 'Informe aqui seu nome...',
          name: ''
        }
      }
    };
  },
  computed: {
    todayFormatString() {
      const date = new Date()
      date.setDate(date.getDate() - 7)
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0') // prazo de 7 dias
      return `${y}-${m}-${d}`
    },
    registerButtonReserveStatus() {
      if(this.inputedName.length < 4) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    this.dbConnectCollaborators()
    this.dbConnectReserves()
  },

  methods: {
    formatter(d) {
      const date = d.split('-')
      parseInt(date[2]) + 1
      date.join('-')
      return new Date(date).toLocaleDateString('pt-BR')
    },
    async register(value) {
      if(value === 'Reservar') {
        this.dbConnectReserves()
        await this.$http('reserves.json')
          this.createSeasons()
          const indDate = Object.values(this.reserves).findIndex((p) => p.date === this.inputedDate)
          const idRes = Object.keys(this.reserves)[indDate]
          const idTable = Object.values(this.reserves)[indDate].tables.findIndex((p) => p.tableName === this.modalDate.title)
          const idPerson = Object.values(this.collaborators).findIndex((p) => p.cpf === this.inputedCPF)
          const collaboratorName = Object.values(this.collaborators)[idPerson].name
          const collaboratorDocument = Object.values(this.collaborators)[idPerson].cpf
          await this.$http.patch(`/reserves/${idRes}/tables/${idTable}/.json`, { avaiable: false, person: collaboratorName, document: collaboratorDocument})
          this.modalDate.avaiable = false
          const res = await this.$http('reserves.json')
          this.tables = []
          this.tables = Object.values(res.data)[indDate].tables
          this.$refs.modalReserve.hide()
          this.alertReserve.status = true
          //criando historico de reservas
          const idCollaborator = Object.values(this.collaborators).findIndex((p) => p.cpf === collaboratorDocument)
          const idCol = Object.keys(this.collaborators)[idCollaborator] 
          this.dbConnectCollaborators()
          if(Object.values(this.collaborators)[idCollaborator].reserves === undefined) {
            await this.$http.patch(`/collaborators/${idCol}/.json`, { reserves: [{ date: this.inputedDate, table: this.modalDate.title, status: 'Ativo', checkInStatus: 'Pendente' }] })
          } else {
            console.log('mais uma reserva adicionada') 
            await this.$http.post(`collaborators/${idCol}/reserves.json`, [{ date: this.inputedDate, table: this.modalDate.title, status: 'Ativo', checkInStatus: 'Pendente' }])
          }
          this.alertReserve.message = 'Reserva realizada com sucesso. Não esqueça de realizar o check-in no dia da reserva.'
      } else if(value === 'Cadastrar') {''
        await this.$http.post('collaborators.json', {cpf: this.inputedCPF, name: this.inputedName})
          this.dbConnectCollaborators()
          this.reserveModalStyle.inputStatus = false
          this.alertModal.text = `${this.inputedName}, seu cadastro foi concluido com sucesso. Para realizar sua reserva, clique em reservar.`
          this.alertModal.status = true
          this.modalDate.avaiable = false
          this.reserveModalStyle.variant = 'info'
          this.reserveModalStyle.value = 'Reservar'
      }
    },
    async isRegistredOrReserved() {
      await this.dbConnectReserves()
      const indDate = Object.values(this.reserves).findIndex((p) => p.date === this.inputedDate)
      const tableInd = Object.values(this.reserves)[indDate].tables.findIndex((p) => p.document === this.inputedCPF)
      if(tableInd !== -1) {
        const tableName = Object.values(this.reserves)[indDate].tables[tableInd].tableName
        this.alertModal.status = true
        this.alertModal.variant = 'warning'
        this.alertModal.text = `Para o CPF digitado já consta uma reserva neste dia para a ${tableName}.`
        return
      }
      if(this.collaborators === null) {
          this.alertModal.status = true
          this.alertModal.variant = 'warning'
          this.alertModal.text = 'O CPF digitado ainda não tem cadastro na nossa base. Certifique que o mesmo esteja correto, informe seu nome no campo indicado e clique em cadastrar.'
          this.reserveModalStyle.value = 'Cadastrar'
          this.reserveModalStyle.variant = 'success'
          this.reserveModalStyle.status = false
          this.reserveModalStyle.inputStatus = true      
        } else {
        const test = Object.values(this.collaborators).findIndex((p) => p.cpf === this.inputedCPF)
        if(test != '-1') {
          const name = Object.values(this.collaborators)[test].name
          this.alertModal.status = true
          this.alertModal.variant = 'success'
          this.alertModal.text = `${name}, confira seu CPF e conclua a reserva.`
          this.reserveModalStyle.value = 'Reservar'
          this.reserveModalStyle.message.name = name
          this.reserveModalStyle.variant = 'info'
          this.reserveModalStyle.status = false
          this.inputedName = name
          return true
        } else {
          this.inputedName = ''
          this.alertModal.status = true
          this.alertModal.variant = 'warning'
          this.alertModal.text = 'O CPF digitado ainda não tem cadastro na nossa base. Certifique que o mesmo esteja correto, informe seu nome no campo indicado e clique em cadastrar.'
          this.reserveModalStyle.value = 'Cadastrar'
          this.reserveModalStyle.variant = 'success'
          this.reserveModalStyle.status = false
          this.reserveModalStyle.inputStatus = true
          return false
        }
      }
    },
    async dbConnectCollaborators() {
      const res = await this.$http('collaborators.json')
        this.collaborators = res.data
    },
    async dbConnectReserves() {
      const res = await this.$http('reserves.json')
          res.data === null ? [] : this.reserves = res.data
    },

    async createSeasons() {
      const obj = Object.values(this.reserves)
      const index = obj.findIndex((p) => p.date === this.inputedDate)
      if(index === -1) {
        this.workSeasons.date = this.inputedDate
        this.workSeasons.tables = []
        this.workSeasons.meetingRoom = { name: 'Sala de Reunião', status: false }
        for(let i = 0; i < 10; i++) {
          await this.workSeasons.tables.push({ tableName: `Mesa ${i+1}`, avaiable: true, person: '', document: '', checkIn: false})
        }
          await this.$http.post('reserves.json', this.workSeasons)
          this.tables = this.workSeasons.tables
          this.dbConnectReserves()
        } else {
          const tables = Object.values(this.reserves)[index]
          this.tables = tables.tables
          this.reserveModalStyle.validator = true
      }
    }, 
    buttonStatus(person) {
      const tableStatus = Boolean(person)
      if(tableStatus) {
        return 'warning'
      } else {
        return 'success'
      }
    },
    
    preReserve(name, status, date) {
      this.alertReserve.status = false
      this.modalDate.title = name
      this.modalDate.avaiable = status
      this.modalDate.date = date
      if(this.modalDate.avaiable) {
        this.$refs.modalReserve.show()
      } else {
        setTimeout(() => {
          this.alertReserve.status = false
        }, 6000);
        this.alertReserve.status = true
        this.alertReserve.message = 'A mesa seleciona já encontra-se reservada, selecione outra.'
      }
    },

    closedModal() {
      this.inputedCPF = ''
      this.inputedName = ''
      this.reserveModalStyle.inputStatus = false
      this.alertModal.status = false
    },

    selectedDate() {
      const date = Object.values(this.reserves)
      const indDate = date.findIndex((p) => p.date === this.inputedDate)
      const selected = Object.values(date)[indDate]
      return selected
    }

  },
  watch: {
    'inputedDate': function() {
      this.reserveModalStyle.validator = false
      const date = Object.values(this.reserves)
      const indDate = date.findIndex((p) => p.date === this.inputedDate)
      const selected = Object.values(date)[indDate]
      this.tables = []
      if(selected) {
        this.dbConnectReserves()
        this.tables = (Object.values(selected)[2])
      } else {
        this.createSeasons()
      }
    },
    'inputedCPF': function() {
      if(this.inputedCPF.length < 11) {
        this.reserveModalStyle.variant = 'info'
        this.reserveModalStyle.value = 'Reservar'
        this.alertModal.status = false
        this.reserveModalStyle.status = true
        this.reserveModalStyle.inputStatus = false
      } else if(this.inputedCPF.length === 11) {
        this.isRegistredOrReserved()
      } 
    }
  }
};
</script>

<style scoped>

#buttonSearch {
  margin-top: 28px;
}

[bold] {
  font-weight: bold;
}

[centralized] {
  text-align: center;
}

#dateGroup {
  margin-right: 20px;
  margin: auto;
}

#groupSeasons {
  animation: fadeIn;
  animation-duration: 1s;
  width: 100%;
  margin: auto;
  margin-top: 30px;
}

#message {
  font-size: 10px;
}

#modalReserve {
  height: 100%;
}

#reserved {
  text-align: center;
}

#seasons {
  animation: fadeIn;
  animation-duration: 1s;
  width: 90%;
  height: 70px;
  margin-right: 10px;
  margin: auto;
  margin-top: 5px;
  box-shadow: 2px 2px 2px rgb(179, 179, 179);
  cursor: pointer;
}

[small] {
  font-size: 15px;
}

[smallest] {
  font-size: 12px;
}

#status {
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  position: absolute;
}

#statusBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 68px;
}

#tableDateReserve {
  width: 70%;
} 

#workSeasonName {
  /* border: 1px solid black; */
  height: 100%;
  font-size: 19px;
}

#app {
  animation: fadeIn;
  animation-duration: 1s;
}


</style>