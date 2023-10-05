<template>
  <div id="app">
    <b-modal ref="modalReserve"
      hide-header
      hide-footer
      centered
      @hide="closedModal">
      <div id="modalReserve" centralized>
        <b-card :title="tableData.name">
          <b-card-text>Data: {{ formatter(inputedDate) }}</b-card-text>
          <b-card-text>Status: {{ tableData.avaiable == true ? 'Disponível' : 'Indisponível' }}</b-card-text>
        </b-card>
        <b-alert :variant="this.messageAlert.variant" :show="this.messageAlert.status" class="mt-2">{{ this.messageAlert.text }}</b-alert>
        <b-form-group
          centralized
          class="mt-3">
          <b-input-group prepend="CPF" size="sm">
            <b-form-input centralized placeholder="Informe seu CPF para reservar esta mesa" type="password" v-model.number="inputedCPF" :disabled="!tableData.avaiable"></b-form-input>
            <b-input-group-append>
              <b-button variant="info">Reservar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
      <p id="messageRegister" centralized>Se ainda não é cadastrado, <a>clique aqui.</a></p>
    </b-modal>
    <b-container id="tableDateReserve" centralized class="mt-5">
      <b-form-group label="Informe a data da Reserva" id="dateGroup">
        <b-input type="date" v-model="inputedDate" :min="todayFormatString"></b-input>
      </b-form-group>
    </b-container>
    <div id="groupSeasons">
      <b-row>
        <b-col md="6">
          <b-card id="seasons" v-for="(season, i) in tabless" :key="i" v-show="i < 5">
            <b-row>
              <b-col md="1">
                <b-button id="status" :variant="buttonStatus(season.person)" @click="abrirModal(season.name, season.avaiable, season)"></b-button>
              </b-col>
              <b-col md="6">
                {{ season.name }}
              </b-col>
              <b-col md="5">
                {{ season.person ? 'Indisponível' : 'Disponível' }}
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col md="6">
          <b-card id="seasons" v-for="(season, i) in tabless" :key="i" v-show="i > 4">
            <b-row>
              <b-col md="1">
                <b-button id="status" :variant="buttonStatus(season.person)" @click="abrirModal(season.name, season.avaiable, season)"></b-button>
              </b-col>
              <b-col md="6">
                {{ season.name }}
              </b-col>
              <b-col md="5">
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
      inputedCPF: '',
      reserves: [],
      search: [],
      tabless: [],
      buttonColor: 'success',
      tableData: {
        name: '',
        avaiable: '',
        date: ''
      },
      messageAlert: {
        text: '',
        variant: 'success',
        status: false
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
          this.workSeasons.tables.push({ name: `Mesa ${i+1}`, avaiable: true, person: ''})
        }
        this.$http.post('reserves.json', this.workSeasons)
        setTimeout(() => {
          this.dbConnectReserves()        
        }, 2000);
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
    
    abrirModal(name, status, date) {
      this.$refs.modalReserve.show()
      this.tableData.name = name
      this.tableData.avaiable = status
      this.tableData.date = date
    },

    closedModal() {
      this.inputedCPF = ''
      this.messageAlert.status = false
    }
  },
  watch: {
    'inputedDate': function() {
      const data = Object.values(this.reserves)
      const c = data.findIndex((p) => p.data === this.inputedDate)
      const selected = Object.values(data)[c]
      selected ? this.tabless = (Object.values(selected)[1]) : this.createSeasons()
    },
    'inputedCPF': function() {
      if(typeof(this.inputedCPF) === 'string') {
        this.messageAlert.text = 'O campo CPF deve conter apenas numeros.'
        this.messageAlert.variant = 'warning'
        this.messageAlert.status = true
      } else {
        this.messageAlert.status = false
      }
    }
  }
};
</script>

<style scoped>

#buttonSearch {
  margin-top: 28px;
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

#messageRegister {
  font-size: 10px;
}

#modalReserve {
  height: 100%;
}

#reserved {
  text-align: center;
}

#seasons {
  width: 100%;
  height: 70px;
  margin-right: 10px;
  margin: auto;
  margin-top: 5px;
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