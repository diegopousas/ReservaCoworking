<template>
  <div id="app">
    <h1>Agendamento Coworking</h1>
    <p>Qual a data que deseja agendar ? <input type="date" class="inpDate" v-model="date" @blur="haveVacancy"></p>
    <p>Informe seu nome: <input type="text" v-model="name" @keydown.enter="reserve"></p>
    <p><b-button variant="primary" @click="reserve">Salvar</b-button> <b-button variant="primary" v-show="reserves.length" @click="show = !show">Cancelar Reserva</b-button></p>
    <div class="cancellationTab" v-if = show>
      <p v-if="reserves.length">Informe qual a data da reserva que deseja cancelar
        <select v-model="selectedDate">
          <option v-for="reserve in reserves">{{ reserve.date }}</option>
        </select>
      </p>
      <List v-if = "selectedDate" 
      :filtered-names = "filteredNames"
      @canceled="cancel($event)"/>
    </div>
    <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
      <b-alert v-if="message.status" show :variant="message.type">{{ message.text }}</b-alert>
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
      name: '',
      date: '',
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
    reserveMessage(m, time, type) {
      this.message.status = true
      this.message.text = m
      this.message.type = type
      setTimeout(() => {
        this.message.status = false
      }, time);
    },
      reserve() {
        if(this.vacancies > 0) {
          const inpDate = document.querySelector('.inpDate')
          const index = this.reserves.findIndex((reserve) => reserve.date === this.date)
          const obj = {}
          obj.name = this.name
          if(this.reserves[index] === undefined) {
            const obj = {}
            obj.pessoas = []
            obj.date = this.date
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
          console.log(this.reserves)
          this.reserveMessage('Reserva realizada com sucesso !', 4000, 'success')
        } else {
          alert('O numero de vagas foi totalmente preenchido !')
        }
      },
      cancel(p) {
        if(this.selectedName === '') {
          this.reserveMessage('Nenhum nome foi selecionado !', 3000)
        } else {
          this.selectedName = p
          const confirmation = confirm(`${p}, deseja realmente cancelar sua reserva ?`)
          const indexDate = this.reserves.findIndex((p) => p.date === this.selectedDate)
          const indexName = this.reserves[indexDate].pessoas.findIndex((p) => p.name === this.selectedName)
          this.reserves[indexDate].pessoas.splice(indexName, 1)
          if(this.reserves[indexDate].pessoas.length === 0) {
            this.reserves.splice(indexDate)
          }
        }
        this.show = false
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
      formatDate(data) {
        const dateF = data.toLocaleString('pt-BR')
        const formatedDate = dateF.slice(0, 10)
        return formatedDate
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
                console.log('sim')
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
    },
    watch: {
      show() {
          return this.reserves.sort((a, b) => new Date(a.date) - new Date(b.date))
      },

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

.slide-enter, .slide-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: slide 2s;
}

</style>
