<template>
  <div>
    <b-form-group title="Reserva" label="Selecione seu Nome: ">
      <b-form-select
        v-model="selected">
          <option :value="null" disabled>-- Selecione seu nome --</option>
          <option v-for="(collab, id) in collaboratorsList" :key="id">{{ collab.name }} - {{ collab.cpf | cpf }}</option>  
      </b-form-select>
    </b-form-group>
  </div>
</template>

<script>
export default {
name: 'reserveComp',
  data() {
    return {
      selected: 'null',
      collaborators: []
    }
  },
  created() {
  this.$http('collaborators.json')
    .then((res) => {
      this.collaborators = res.data
    })
  },
  computed: {
    collaboratorsList() {
      return Object.values(this.collaborators)
    }
  },
  watch: {
    'selected': function() {
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