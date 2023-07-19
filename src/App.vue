<template>
  <div id="app">
    <h1>Agendamento Coworking</h1>
    <p>Qual a data que deseja agendar ? <input type="date" class="inpData" v-model="data"></p>
    <p>Informe seu nome: <input type="text" v-model="nome"></p>
    <p><button @click="reservar">Salvar</button> <button @click="mostrar = !mostrar">Cancelar Reserva</button></p>
    <p v-if="reservas.length == 10" style="color:red; font-size: 13px;font-weight: bold;">O número de vagas disponiveis esgotou.</p>
    <p v-if="reservas.length == 10" style="color:green; font-size: 13px;">Você pode realizar uma reserva e seu nome estará na lista espera de uma desistência.</p>
    <p v-else style="color: gray; font-size: 13px;">Restam <strong>{{ 10 - reservas.length }}</strong> vaga(s) disponíveis.<br>Após preenchidas, abrimos uma lista de espera.</p>
    <hr>
    <div class="abaCancelamento" v-if = mostrar>
      <p>Selecione o nome que deseja cancelar:</p>
      <select v-model="cancSelecionado">
        <option class="selectCancelamento" v-for="reserva of reservas" :value="reserva">{{ reserva }}</option>
      </select>
      <button class="btnCancelar" @click="cancelar">Confirmar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      nome: '',
      data: '',
      reservas: ['Aline', 'Fernando', 'Claudio', 'Amanda', 'Douglas', 'Renata', 'Mariana', 'Orlando', 'Margareth'],
      listaEspera: [],
      mostrar: false,
      cancSelecionado: ''
    }
  },
  methods: {
      reservar() {
            if(this.reservas.length < 10) {
              const novaReserva = this.nome
              this.reservas.push(novaReserva)
              this.reservas.sort()
            } else {
            const confirmacao = confirm(`${this.nome}, o numero de vagas esgotou, deseja entrar na lista de espera ?`)
            if(confirmacao) {
              this.listaEspera.push(this.nome)
              alert(`${this.nome}, você é a ${this.listaEspera.length}ª pessoa da lista de espera.`)
            } 
          }
          this.nome = '' 
          this.data = ''
      },
      cancelar() {
        const confirmacao = confirm(`${this.cancSelecionado}, deseja realmente cancelar sua reserva ?`)
        const index = this.reservas.indexOf(this.cancSelecionado)
        if(confirmacao){
          this.reservas.splice(index, 1)
          this.reservas.sort()
          if(this.listaEspera.length > 0) {
            const prioridade = this.listaEspera[0]
            this.reservas.push(prioridade)
            let index = this.listaEspera.indexOf(prioridade)
            this.listaEspera.splice(index, 1)
            this.reservas.sort()
            alert(`${this.cancSelecionado} sua vaga foi cancelada e preenchida pelo(a) ${prioridade}.`)
          }
        }
        this.mostrar = false
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

</style>
