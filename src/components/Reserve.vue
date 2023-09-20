<template>
  <div>
    <!-- <b-form-group 
      label="Informe seu Nome: "
      v-for="(name, id) in collaborators" 
      :key="id">
    <b-form-select :options="name" v-model="selected"></b-form-select>
    </b-form-group> -->


    <b-form-select
      v-model="selected"
      :options="collaborators"
      :value="collaborators.data">

    </b-form-select>


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