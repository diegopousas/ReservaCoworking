<template>
  <div id="app">
    <b-card id="title" class="mt-2">Reserva Coworking Demarco</b-card>
    <div id="navBar" class="mt-2">
      <Menu />
    </div>
    <router-view></router-view>
    <router-view name="novoMenu"></router-view>

    <!-- <hr>
    <Filho /> -->

    <Footer class="mt-5"/>

  </div>
</template>

<script>
import Menu from './components/mainMenu.vue'
import Footer from './components/Footer.vue'

export default {
  components: { Menu, Footer },
  computed: {
    produtos() {
      return this.$store.state.produtos
    }
  },
  methods: {
    teste(i) {
      this.$store.state.delete(i.target)
    }
  }
}
</script>

<style>
#app {
  margin: auto;
  width: 80%;
  font-family: 'Poppins', sans-serif;
}

#title {
  text-align: center;
  font-size: 27px;
  background: black;
  color: white;
}

#navBar {
  text-align: center;
}

</style>































































<!-- <template>
  <transition enter-active-class="animate__animated animate__fadeIn" appear>
    <div id="app">
        <div class="reserveTab" v-if="reserveTab">
          <h1 class="titlePage">Agendamento Coworking</h1>
          <b-card>
              <b-form-group label="Data agendamento: ">
                <b-input type="date" class="inpDate" v-model="date" @blur="haveVacancy" size="sm"/>
              </b-form-group>
              <b-form-group label="Informe seu Nome: " placeholder="Informe o seu nome aqui...">
                <b-input type="text" class="inpName" v-model="name" @keydown.enter="searchName" size="sm"/>
              </b-form-group>
              <b-button id="reserveButton" class="mr-2" variant="success" size="sm" @click="searchName">Salvar</b-button> 
              <b-button class="mr-2" variant="danger" size="sm" v-show="reserves.length" @click="cancelTab">Cancelar Reserva</b-button>
              <b-button variant="info" size="sm" @click="registerNewColaborator">Cadastro Colaborador</b-button>
            </b-card>
            <router-view></router-view>
        </div>
          <div v-if="cancellationTab">
            <h1>Cancelamento Reserva</h1>
              <p v-if="reserves.length">Informe qual a data da reserva que deseja cancelar
                <select size="md" v-model="selectedDate">
                  <option v-for="(reserve, id) in reserves" :value="reserve.date" :key="id">{{ formatDate(reserve.date) }}</option>
                </select>
                <b-button variant="info" size="sm" class="ml-2" @click="reserveTab = true" v-if="!this.selectedDate">Voltar ao inicio</b-button>
              </p>
                <List v-if = "selectedDate" 
                :filtered-names = "filteredNames"
                @canceled="cancel($event)"
                @goHome="reserveTab = true"/>
            </div>
          <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
            <b-alert v-if="message.status" show :variant="message.type" :size="message.size">{{ message.text }}</b-alert>
          </transition>
          <b-modal ref="my-modal" hide-footer title="Using Component Methods">
            <div class="modalCancell">
              <b-button class="mr-1">Sim</b-button>
              <b-button>Não</b-button>
            </div>
          </b-modal>
          <Register v-if="newColaborator"
            @backingHome="initialState"
            :name="preName"
          />
    </div>
  </transition>
</template>
<script>
import List from './components/List.vue'
import Register from './components/Register.vue'
export default {
  name: 'App',
  components: { List, Register },
  data() {
    return {
      preName: '',
      reserveTab: true,
      cancellationTab: false,
      name: '',
      date: '',
      displayReserve: true,
      reserves: [
        {date: '2023-01-01', 
          persons: [
            {name: 'Diego Vieira'},
            {name: 'Renata Nunes'},
            {name: 'Marcos Alves'},
            {name: 'Arlindo Cruz'},
            {name: 'Marcelo D2'},
            {name: 'Gustavo Lima'},
            {name: 'Cesar Menotti'},
            {name: 'Paulo Felipe'},
            {name: 'Fabio Pavarotti'},
            {name: 'Junior Carlos'}
          ]  
        },
        {date: '2023-01-02', 
          persons: [
            {name: 'Popó da Bahia'},
            {name: 'Tania Pires'},
            {name: 'Marco Antonio'}
          ]  
        },
        {date: '2023-01-03', 
          persons: [
            {name: 'Maria do Bairro'},
            {name: 'Antônia Felipa'},
            {name: 'Mario Flores'}
          ]  
        }],      
      waitingList: [],
      show: false,
      selectedName: '',
      selectedDate: '',
      formatedDate: '',
      dataSelecionada: '',
      vacancies: '',
      message: {
        status: false,
        text: '',
        type: ''
      },
      isRegistred: false,
      newColaborator: false,
      modal: {
        text: '',
        ok: '',
        cancel: '',
        resModal: ''
      }
    }
  },
  methods: {

    initialState() {
      this.reserveTab = true
      this.cancellationTab = false
      this.newColaborator = false
    },

    searchName() {
      const nameSearch = this.name.toLowerCase()
      this.isRegistred = this.reserves.some(reserve => 
      reserve.persons.some(person => person.name.toLowerCase() === nameSearch))
      if(this.isRegistred) {
        this.reserve()
      } else {
        setTimeout(() => {
          this.reserveTab = false
          this.cancellationTab = false
          this.newColaborator = true
        }, 3000)
        console.log(this.preName)
        this.reserveMessage('Você ainda não tem cadastro em nosso sistema, favor realiza-lo antes de realizar uma reserva.', 3000, 'warning')
      }
      this.preName = this.name
    },

    registerNewColaborator() {
      this.newColaborator = true
      this.reserveTab = false
      this.cancellationTab = false
    },

    mostrarModal() {
      this.$refs['my-modal'].show()
    },
    reserveMessage(m, time, type) {
      this.message.status = true
      this.message.text = m
      this.message.type = type
      setTimeout(() => {
        this.message.status = false
      }, time);
    },
      reserve() {
        if(!this.name || !this.date) {
          if(!this.name && !this.date) {
            this.reserveMessage('Os campos data e nome são obrigatórios, favor preenchê-los.', 1500, 'danger')
            document.querySelector('.inpDate').focus()      
          } else if(!this.date) {
            this.reserveMessage('O campo data é obrigatório, favor preenchê-lo.', 1500, 'danger')
            document.querySelector('.inpDate').focus()
          } else {
            this.reserveMessage('O campo nome é obrigatório, favor preenchê-lo.', 1500, 'danger')
            document.querySelector('.inpName').focus()            
          }
        } else {
          if(this.vacancies > 0) {
            const inpDate = document.querySelector('.inpDate')
            const index = this.reserves.findIndex((reserve) => reserve.date === this.date)
            const obj = {}
            obj.name = this.name
            if(this.reserves[index] === undefined) {
              const obj = {}
              obj.persons = []
              obj.date = this.date
              obj.dateFormated = this.formatDate(this.date)
              const objPerson = {}
              objPerson.name = this.name
              obj.persons.push(objPerson)
              this.reserves.push(obj)
              this.date = ''
              this.name = ''
              this.reserveMessage('Reserva realizada com sucesso !', 1500, 'success')
              inpDate.focus()
            } else {
              this.reserveMessage('Já existe uma reserva para o nome informado.', 1500, 'danger')
              // const index = this.reserves.findIndex((reserve) => reserve.date === this.date)
              // const obj = {}
              // obj.name = this.name
              // this.reserves[index].persons.push(obj)
            }
            // this.message.text = ''
          } else {
            const index = this.waitingList.findIndex((reserve) => reserve.date === this.date)
            if(index) {
              const obj = {}
              obj.persons = []
              obj.date = this.date
              obj.dateFormated = this.formatDate(this.date)
              const objPerson = {}
              objPerson.name = this.name
              obj.persons.push(objPerson)
              this.waitingList.push(obj)
              this.reserveMessage(`${this.name}, seu nome é o 1º lista de espera.`, 1500, 'info')
              this.name = ''
              this.date = ''
              console.log(this.waitingList)
            } else {
              const obj = {}
              obj.name = this.name
              this.waitingList[index].persons.push(obj)
              this.reserveMessage(`${this.name}, seu nome é o ${this.waitingList[index].persons.length}º na lista de espera.`, 1500, 'info')
              console.log(this.waitingList)
              this.name = ''
              this.date = ''
              console.log(index)
            }
          }
        }
      },
      cancelTab() {
        this.selectedDate = '',
        this.reserveTab = false
        this.cancellationTab = true    
      },
      cancel(p) {
        if(p === '') {
          this.reserveMessage('Selecione o nome que deseja cancelar a reserva.', 1500)
        } else {
          this.selectedName = p
          const confirmation = confirm(`${p}, deseja realmente cancelar sua reserva ?`)
          if(confirmation) {
            const indexDate = this.reserves.findIndex((p) => p.date === this.selectedDate)
            const indexName = this.reserves[indexDate].persons.findIndex((p) => p.name === this.selectedName)
            this.reserves[indexDate].persons.splice(indexName, 1)
            this.reserveMessage('Reserva cancelada !', 1500, 'success')
            setTimeout(() => {
              this.reserveTab = true
            }, 3000);
            if(this.reserves[indexDate].persons.length === 0) {
              this.reserves.splice(indexDate)
            }
          } 
          this.reserveTab = false
          }
        },  

      newDate(date) {
        const arr = date.split('-')
        const dia = parseInt(arr[2])
        const mes = parseInt(arr[1]) - 1
        const ano = arr[0]
        const completeDate = []
        completeDate.push(ano)
        const dd = dia.toString()
        completeDate.push(mes)
        completeDate.push(dd)
        return new Date(...completeDate)
      },
      formatDate(date) {
        const dateOrig = date.split('-')
        dateOrig.reverse()
        const dateF = dateOrig.join('/')
        return dateF
      },
      haveVacancy() {
        if(this.date) {
          const finder = this.reserves.find((reserve) => reserve.date === this.date)
          // Novo dia sem nenhuma reserva
          if(finder !== undefined) {
            const reserves = ((this.reserves.find((reserve) => reserve.date === this.date).persons).length)
            this.vacancies = 10 - reserves
            // Dia com reservas porém com vagas disponíveis
            if(reserves < 10) {
              this.reserveMessage(`Existem ainda ${this.vacancies} vagas restantes para o dia selecionado.`, 1500, 'warning')
            } else {
              const waitingList = confirm('O numero de reservas para o dia selecionado esgotou, deseja inserir seu nome na lista de espera ?')
              if(waitingList) {
                document.querySelector('.inpName').focus()
              } else {
                const inpDate = document.querySelector('.inpDate')
                console.log('nao')
                inpDate.focus()
                this.date = ''
              }
            }
          } else {
            this.reserveMessage('Para o dia selecionado ainda não existem reservas.', 3000)
            this.vacancies = 10
          }
        }
      }
    },
    computed: {
      filteredNames() {
        const reserves = this.reserves.find((reserve) => reserve.date === this.selectedDate)
        return reserves ? reserves.persons : []
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.titlePage {
  margin-bottom: 50px;
}

.reserveTab {
  width: 80%;
  margin: auto;
}

.inpDate {
  text-align: center;
}

.inpName {
  text-align: center;
}

.lista li {
  margin: 10px;
  list-style: none;
}
.cancelar {
  display: inline-block;
  width: 100px;
  margin-left: 50px;
}
.btnConfirmar {
  margin-left: 5px;
}
.btnCancelar {
  margin-left: 5px;
}
.remainingReserve {
  color: gray; 
  font-size: 13px;
}
.warningReserve {
  color:green; 
  font-size: 13px;
}
.closedReserve {
  color:red; 
  font-size: 13px;
  font-weight: bold;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: fade 1s;
}

</style> -->
