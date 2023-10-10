<template>
  <div id="app">
    <b-modal ref="modalReserve"
      hide-header
      hide-footer
      centered
      @hide="closedModal">
      <div id="modalReserve" centralized>
        <b-card :title="modalData.title">
          <b-card-text>Data: {{ formatter(inputedDate) }}</b-card-text>
          <b-card-text bold>{{ modalData.avaiable == true ? 'Disponível' : 'Indisponível' }}</b-card-text>
        </b-card>
        <b-alert :variant="this.messageAlert.variant" :show="this.messageAlert.status" class="mt-2">{{ this.messageAlert.text }}</b-alert>
        <b-form-input id="inpName" centralized type="text" v-model="inputedName" size="sm" class="mt-3" v-if="reserveModalStyle.inputStatus" :placeholder="reserveModalStyle.message.placeName">{{ reserveModalStyle.message.name }}</b-form-input>
        <b-form-group
        description="Digite somente os números do seu CPF"
        centralized
        class="mt-1">
        <b-input-group prepend="CPF" size="sm" class="mt-1">
          <b-form-input centralized placeholder="Informe seu CPF para reservar esta mesa" type="text" v-model="inputedCPF" :disabled="!modalData.avaiable" maxlength="11"></b-form-input>
          <b-input-group-append>
              <b-button :variant="reserveModalStyle.variant" :disabled="registerButtonReserveStatus" @click="register(reserveModalStyle.value)">{{ reserveModalStyle.value }}</b-button>
            </b-input-group-append>
          </b-input-group>
          <p class="message" v-if="reserveModalStyle.status">{{ reserveModalStyle.message.text }}</p>
        </b-form-group>
      </div>
    </b-modal>
    <b-container id="tableDateReserve" centralized class="mt-5">
      <b-form-group label="Informe a data da Reserva" id="dateGroup">
        <b-input type="date" v-model="inputedDate" :min="todayFormatString"></b-input>
      </b-form-group>
    </b-container>
    <div id="groupSeasons">
      <b-row>
        <b-col md="6">
          <b-card id="seasons" v-for="(season, i) in tables" :key="i" v-show="i < 5" @click="preReserve(season.tableName, season.avaiable, season)">
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
          <b-card id="seasons" v-for="(season, i) in tables" :key="i" v-show="i > 4" @click="preReserve(season.tableName, season.avaiable, season)">
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
      modalData: {
        title: '',
        avaiable: '',
        date: ''
      },
      messageAlert: {
        status: false,
        text: '',
        variant: 'success'
      },
      reserveModalStyle: {
        inputStatus: false,
        status: true,
        variant: 'info',
        value: 'Reservar',
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
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
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

    register(value) {
      if(value === 'Reservar') {
        const indData = Object.values(this.reserves).findIndex((p) => p.data === this.inputedDate)
        const indPerson = Object.values(this.collaborators).findIndex((p) => p.cpf === this.inputedCPF)
        const indTable = Object.values(this.reserves)[indData].tables.findIndex((p) => p.name === this.modalData.title)
        this.$http.update(Object.values(this.reserves)[indData].tables[indTable].person, Object.values(this.collaborators)[indPerson].name)
        console.log(Object.values(this.reserves)[indData].tables[indTable].person)
      } else if(value === 'Cadastrar') {
        this.$http.post('collaborators.json', {cpf: this.inputedCPF, name: this.inputedName})
          .then(() => {
            this.dbConnectCollaborators()
            this.reserveModalStyle.inputStatus = false
            this.messageAlert.text = `${this.inputedName}, seu cadastro foi concluido com sucesso. Para concluir sua reserva, clique em reservar.`
            this.messageAlert.status = true
            this.modalData.avaiable = false
            this.reserveModalStyle.variant = 'info'
            this.reserveModalStyle.value = 'Reservar'
          })        
      }
    },

    isRegistred() {
      let test = Object.values(this.collaborators).findIndex((p) => p.cpf === this.inputedCPF)
      if(test != '-1') {
        let name = Object.values(this.collaborators)[test].name
        this.messageAlert.status = true
        this.messageAlert.variant = 'success'
        this.messageAlert.text = `${name}, confira seu CPF e conclua a reserva.`
        this.reserveModalStyle.value = 'Reservar'
        this.reserveModalStyle.message.name = name
        this.reserveModalStyle.variant = 'info'
        this.reserveModalStyle.status = false
        this.inputedName = name
        return true
      } else {
        this.inputedName = ''
        this.messageAlert.status = true
        this.messageAlert.variant = 'warning'
        this.messageAlert.text = 'O CPF digitado ainda não tem cadastro na nossa base. Certifique que o mesmo esteja correto, informe seu nome no campo indicado e clique em cadastrar.'
        this.reserveModalStyle.value = 'Cadastrar'
        this.reserveModalStyle.variant = 'success'
        this.reserveModalStyle.status = false
        this.reserveModalStyle.inputStatus = true
        return false
      }
    },

    async dbConnectCollaborators() {
      const res = await this.$http('collaborators.json')
        this.collaborators = res.data
    },
    dbConnectReserves() {
      this.$http('reserves.json')
        .then((res) => {
          res.data === null ? [] : this.reserves = res.data
        })
    },

    createSeasons() {
      const obj = Object.values(this.reserves)
      const index = obj.findIndex((p) => p.data === this.inputedDate)
      if(index === -1) {
        this.workSeasons.data = this.inputedDate
        this.workSeasons.tables = []
        for(let i = 0; i < 10; i++) {
          this.workSeasons.tables.push({ tableName: `Mesa ${i+1}`, avaiable: true, person: ''})
        }
        this.$http.post('reserves.json', this.workSeasons)
          this.dbConnectReserves()
          this.tables = this.workSeasons.tables     
      } else {
        this.dbConnectReserves()
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
      this.$refs.modalReserve.show()
      this.modalData.title = name
      this.modalData.avaiable = status
      this.modalData.date = date
    },

    closedModal() {
      this.inputedCPF = ''
      this.inputedName = ''
      this.reserveModalStyle.inputStatus = false
      this.messageAlert.status = false
    }
  },
  watch: {
    'inputedDate': function() {
      const data = Object.values(this.reserves)
      const indDate = data.findIndex((p) => p.data === this.inputedDate)
      const selected = Object.values(data)[indDate]
      if(selected) {
        this.tables = (Object.values(selected)[1])
      } else {
        this.createSeasons()                
      }
    },
    'inputedCPF': function() {
      if(this.inputedCPF.length === 0) {
        this.reserveModalStyle.variant = 'info'
        this.reserveModalStyle.value = 'Reservar'
        this.messageAlert.status = false
        this.reserveModalStyle.status = true
      } else if(this.inputedCPF.length === 11) {
        this.isRegistred()
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

#contentBox {
  width: 90%;
  background-color: gray;
}

#dateGroup {
  margin-right: 20px;
  margin: auto;
}

#groupSeasons {
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


</style>