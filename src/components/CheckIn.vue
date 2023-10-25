<template>
  <div id="app">
    <b-container class="mt-5" centralized>
      <b-form-group
        label="Informe seu CPF no campo abaixo: ">
        <b-input type="text" size="sm" v-model="inputedCPF"></b-input>
        <b-button class="mt-2" @click="searchReserve">Buscar Reservas</b-button>
      </b-form-group>
    </b-container>
    <b-form-group>
      <p v-for="(reserve, i) in datesReserves" :key="i">{{ reserve }}</p>
    </b-form-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reserves: '',
      inputedCPF: '',
      datesReserves: []
    }
  },

  methods: {
    async dbConnectReserves() {
      const res = await this.$http('reserves.json')
      this.reserves = res.data
    },
    
    async searchReserve() {
      const a = Object.values(this.reserves)
      a.forEach((aa) => {
        const indTable = aa.tables.findIndex((p) => p.document === this.inputedCPF)
        if(indTable !== -1 && this.inputedCPF.length === 11) {
          this.datesReserves.push(aa.date)
        }
      })
      console.log(this.datesReserves)
      console.log(`Você tem ${this.datesReserves.length} reservas para realizar o check-in.`)
    }
  },


  created() {
    this.dbConnectReserves()
    this.reserves = []
  }

}
</script>

<style>

[centralized] {
  text-align: center;
}

</style>