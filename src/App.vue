<template>
  <div id="app">
    <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" appear mode="out-in">
      <div class="reserveTab" v-if="reserveTab">
        <h1>Agendamento Coworking</h1>
          <p>Qual a data que deseja agendar ? <input type="date" class="inpDate" v-model="date" @blur="haveVacancy"></p>
          <p>Informe seu nome: <input type="text" class="inpName" v-model="name" @keydown.enter="reserve"></p>
          <p>
            <b-button class="mr-2" variant="success" size="sm" @click="reserve">Salvar</b-button> 
            <b-button class="mr-2" variant="danger" size="sm" v-show="reserves.length" @click="cancelTab">Cancelar Reserva</b-button>
            <b-button variant="info" size="sm" disabled style="text-decoration: line-through;">Dias Disponíveis</b-button>
          </p>
        </div>
        <div class="cancellationTab" v-else>
          <h1>Cancelamento Reserva</h1>
            <p v-if="reserves.length">Informe qual a data da reserva que deseja cancelar
              <select v-model="selectedDate">
                <option v-for="reserve in reserves" :value="reserve.date">{{ formatDate(reserve.date) }}</option>
              </select>
            </p>
            <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" mode="out-in">
              <List v-if = "selectedDate" 
              :filtered-names = "filteredNames"
              @canceled="cancel($event)"
              @goHome="reserveTab = true"/>
            </transition>
          </div>
        </transition>
        <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
          <b-alert v-if="message.status" show :variant="message.type" :size="message.size">{{ message.text }}</b-alert>
        </transition>
  </div>
</template>
<script>
import List from './components/List.vue'
export default {
  name: 'App',
  created() {
  },
  components: { List },
  data() {
    return {
      reserveTab: true,
      name: '',
      date: '',
      displayReserve: true,
      reserves: [
        {date: '2023-01-01', 
          pessoas: [
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
          pessoas: [
            {name: 'Popó da Bahia'},
            {name: 'Tania Pires'},
            {name: 'Marco Antonio'}
          ]  
        },
        {date: '2023-01-03', 
          pessoas: [
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
      }
    }
  },
  methods: {
    reserveMessage(m, time, type, ) {
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
              obj.pessoas = []
              obj.date = this.date
              obj.dateFormated = this.formatDate(this.date)
              const objPerson = {}
              objPerson.name = this.name
              obj.pessoas.push(objPerson)
              this.reserves.push(obj)
            } else {
              const index = this.reserves.findIndex((reserve) => reserve.date === this.date)
              const obj = {}
              obj.name = this.name
              this.reserves[index].pessoas.push(obj)
            }
            this.date = ''
            this.name = ''
            inpDate.focus()
            this.message.text = ''
            this.reserveMessage('Reserva realizada com sucesso !', 2000, 'success')
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
      },
      cancel(p) {
        if(p === '') {
          this.reserveMessage('Selecione o nome que deseja cancelar a reserva.', 2000)
        } else {
          this.selectedName = p
          const confirmation = confirm(`${p}, deseja realmente cancelar sua reserva ?`)
          const indexDate = this.reserves.findIndex((p) => p.date === this.selectedDate)
          const indexName = this.reserves[indexDate].pessoas.findIndex((p) => p.name === this.selectedName)
          this.reserves[indexDate].pessoas.splice(indexName, 1)
          this.reserveMessage('Reserva cancelada !', 2000, 'success')
          setTimeout(() => {
            this.reserveTab = true
          }, 3000);
          if(this.reserves[indexDate].pessoas.length === 0) {
            this.reserves.splice(indexDate)
          }
        }
        this.reserveTab = false
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
            const reserves = ((this.reserves.find((reserve) => reserve.date === this.date).pessoas).length)
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
        return reserves ? reserves.pessoas : []
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

</style>
