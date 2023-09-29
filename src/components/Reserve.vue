<template>
  <div>
    <b-form-group title="Reserva" label="Selecione seu Nome: ">
      <b-form-select
        v-model="selected">
          <option :value="null" disabled>-- Selecione seu nome --</option>
          <option v-for="(collab, id) in collaboratorsList" :key="id">
            {{ collab.name }} - {{ collab.cpf | cpf }}
          </option>  
      </b-form-select>
      <b-modal ref="calendar" hide-header hide-footer centered no-close-on-backdrop>
        <b-form-group id="calendarGroup"
        :label="`${selected.split(' - ')[0] } escolha a data que deseja reservar: `" class="mt-3">
        <b-alert></b-alert>
          <b-input type="date" class="mt-4" size="sm" v-model="date"></b-input>
          <b-button variant="success" class="mt-5 mr-2">Reservar</b-button>
          <b-button variant="info" class="mt-5" @click="exitCalendar">Cancelar</b-button>
        </b-form-group>
      </b-modal>
    </b-form-group>
  </div>
</template>

<script>
export default {
name: 'reserveComp',
  data() {
    return {
      selected: 'null',
      collaborators: [],
      modal: {
        message: '',
        status: false,
      },
      date: ''
    }
  },
  created() {
    this.dbConnection()  
  },
  computed: {
    collaboratorsList() {
      return Object.values(this.collaborators)
    }
  },
  methods: {
    dbConnection() {
        this.$http('collaborators.json')
          .then((res) => {
        if(res.data) {
          this.collaborators = res.data
        } 
      })
    },
    exitCalendar() {
      this.$refs.calendar.hide()
      this.selected = 'null'
      this.date = ''
    }
  },
  watch: {
    'selected': function() {
      if(this.selected !== 'null')
      this.$refs.calendar.show()
    },
    'date': function() {
      let date = this.date.split('-')
      date[2] ++
      let dateForm = date.join('-')
      let dataa = new Date(dateForm)

      let hoje = new Date()

      if(dataa.getDate() < hoje.getDate()) {
        alert('a data de reserva não pode ser maior que a atual.')
        console.log('Menor')
      } else {
        console.log('maior')
      }
      // console.log(dataa.getFullYear())
      // console.log(dataa.toLocaleDateString('pt-BR'))
    }
  }
}
</script>

<style scoped>

#calendarGroup {
  height: 150px;
  text-align: center;
}

#calendarGroup input {
  text-align: center;
}

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

#modalText {
  text-align: center;
}

[red] {
  color: red;
}

</style>