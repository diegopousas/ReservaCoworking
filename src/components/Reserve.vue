<template>
  <div>
    <b-form-group title="Reserva" label="Selecione seu Nome: ">
      <b-form-select
        v-model="selected"
        :options="collaborators"
        :value="collaborators.data">
  
      </b-form-select>
    </b-form-group>



    <b-button @click="teste" class="mt-5">Salvar</b-button>





<!-- 
    <b-form-group
      label="Data da Reserva">
    <b-input type="date"></b-input>
    </b-form-group> -->
  </div>
</template>

<script>
export default {
name: 'reserveComp',
  data() {
    return {
      selected: '',
      collaborators: []
    }
  },
  created() {
  this.$http('collaborators.json')
    .then((res) => {
      this.collaborators = res.data
      console.log(this.collaborators)
    })
  },
  methods: {
    teste() {
      console.log(this.selected)
    }
  }
}
</script>

<style scoped>

h3 {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
}

h4 {
  text-align: center;
}

#imageBuild {
  width: 50%;
  margin: auto;
}

</style>