<template>
  <div id="app">
    <h1>Agendamento Coworking</h1>
    <p>Qual a data que deseja agendar ? <input type="date" class="inpDate" v-model="date" @blur="haveVacancy"><button @click="buscar">Buscar</button></p>
    <p>Informe seu nome: <input type="text" v-model="name" @keydown.enter="reserve"></p>
    <p><button @click="reserve">Salvar</button> <button v-show="reserves.length" @click="show = !show">Cancelar Reserva</button></p>
    <!-- <p class="warningReserve" v-if="reserves.length == 10">Você pode realizar uma reserva e seu nome estará na lista espera caso ocorra uma desistência.</p> -->
    <p class="remainingReserve" v-if="message.status === true">{{ message.text }}</p>
    <p class="closedReserve" v-if="message.status === false">O número de vagas disponiveis esgotou.</p>
    <hr>
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
      reserves: [
        {date: '2023-01-01', 
          pessoas: [
            {nome: 'Diego Vieira'},
            {nome: 'Renata Nunes'},
            {nome: 'Marcos Alves'},
            {nome: 'Arlindo Cruz'},
            {nome: 'Marcelo D2'},
            {nome: 'Gustavo Lima'},
            {nome: 'Cesar Menotti'},
            {nome: 'Paulo Felipe'},
            {nome: 'Junior Carlos'}
          ]  
        },
        {date: '2023-01-02', 
          pessoas: [
            {nome: 'Popó da Bahia'},
            {nome: 'Tania Pires'},
            {nome: 'Marco Antonio'}
          ]  
        },
        {date: '2023-01-03', 
          pessoas: [
            {nome: 'Maria do Bairro'},
            {nome: 'Antônia Felipa'},
            {nome: 'Mario Flores'}
          ]  
        }],
      
      name: '',
      date: '',
      waitingList: [],
      show: false,
      selectedName: '',
      selectedDate: '',
      formatedDate: '',
      dataSelecionada: '',
      vacancies: '',
      message: {
        status: true,
        text: ''
      }
    }
  },
  methods: {

    buscar() {
      console.log(this.reserves.findIndex((reserve) => reserve.date === this.date))
    },

      reserve() {
        //tem vaga ??
        if(this.vacancies > 0) {
          const inpDate = document.querySelector('.inpDate')
          const index = this.reserves.findIndex((reserve) => reserve.date === this.date)
          const obj = {}
          obj.nome = this.name
          this.reserves[index].pessoas.push(obj)
          this.date = ''
          this.name = ''
          inpDate.focus()
          this.message.text = ''      
        } else {
          alert('O numero de vagas foi totalmente preenchido !')
        }
        // const date = document.querySelector(".inpDate")
        // if(this.name.length < 4 || this.date.length < 5 ){
        //   alert('O nome e data devem ser preenchidos corretamente')
        // } else {
        //   if(this.reserves.length < 10) {       
        //     const obj = {}
        //     obj.date = this.newDate(this.date)
        //     obj.name = this.name
        //     this.reserves.push(obj)
        //     obj.formatedDate = this.formatDate(obj.date)
        //     obj.id = this.reserves.length.toString()
        //     this.name = ''
        //     this.date = ''
        //     date.focus()
        //   } else {
        //     const confirmation = confirm(`${this.newReserve.name}, o numero de vagas esgotou, deseja entrar na lista de espera ?`)
        //     if(confirmation) {
        //       this.waitingList.push(this.newReserve.name)
        //       alert(`${this.newReserve.name}, você é a ${this.waitingList.length}ª pessoa da lista de espera.`)
        //     } 
        //   }
        // }
      },
      cancel(p) {
        const confirmation = confirm(`${p}, deseja realmente cancelar sua reserva ?`)
        this.selectedName = p
        const index = this.reserves.findIndex((p) => p.name === this.selectedName)
        if(confirmation){
          this.reserves.splice(index, 1)
          console.log(this.reserves)
          if(this.waitingList.length > 0) {
            const priority = this.waitingList[0]
            this.reserves.push(priority)
            let index = this.waitingList.indexOf(priority)
            this.waitingList.splice(index, 1)
            alert(`${p} sua vaga foi cancelada e preenchida pelo(a) ${priority}.`)
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
          if(finder !== undefined) {
            const reserves = ((this.reserves.find((reserve) => reserve.date === this.date).pessoas).length)
            this.vacancies = 10 - reserves
            if(reserves < 10) {
              this.message.status = true
              this.message.text = `Existem ainda ${this.vacancies} vagas restantes para o dia selecionado.`      
            } else {
              this.message.status = false
              this.message.text = `O número de vagas para o dia selecionado esgotou.`
            }
          } else {
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

</style>
