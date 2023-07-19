<template>
  <div id="app">
    <h1>Agendamento Coworking</h1>
    <p>Qual a data que deseja agendar ? <input type="date" class="inpData" v-model="data"></p>
    <p>Informe seu nome: <input type="text" v-model="nome"></p>
    <p><button @click="reservar">Salvar</button> <button>Limpar</button> <button @click="cancelar">Cancelar Reserva</button></p>
    <p v-if="reservas.length == 10" style="color:red; font-size: 13px;">O número de vagas disponiveis esgotou.</p>
    <p v-else style="color: gray; font-size: 13px;">Restam {{ 10 - reservas.length }} vaga(s) disponíveis.</p>
    <hr>
    <p>
      <ul class="lista">
        <li v-for="reserva of reservas">{{ reserva }}</li>
      </ul>
    </p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      nome: '',
      data: '',
      reservas: ['Diego', 'Aline', 'Carlos', 'Mariana' ]
    }
  },
  methods: {
      reservar() {
          const novaReserva = this.nome
          this.reservas.push(novaReserva)
          this.nome = '' 
          this.data = ''
      },
      cancelar() {
        
        alert('Para cancelar sua reserva, informe seu nome na caixa de texto a seguir.')
        const nome = prompt('Qual seu nome ?')
        const a = this.reservas.find(busca => busca === nome)
        if(a) {
          const busca = 
          console.log(`${nome}, sua reserva foi cancelada.`)
        } else {
          console.log('Nome não encontrado.')
        }
      },
      valida() {
        const reservas = this.reservas.filter(this.data).length
        console.log(reservas)
      },
      novaData(data) {
        const arr = data.split('-')
        const dia = parseInt(arr[2])
        const mes = parseInt(arr[1]) - 1
        const ano = arr[0]
        const dataCompleta = []
        dataCompleta.push(ano)
        const dd = dia.toString()
        dataCompleta.push(mes)
        dataCompleta.push(dd)
        return new Date(...dataCompleta)
      }
    },
    computed: {

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

</style>
