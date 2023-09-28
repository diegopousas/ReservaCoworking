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
      <b-modal ref="alert" size="lg" ok-only hide-header centered ok-title="Entendi" no-close-on-backdrop>
        <div id="modalText">
          <h5>A tela de reservas ainda está em construção...</h5>
          <h6 red>A única funcionalidade é ver os cadastros que constam no banco.</h6>
        </div>
      </b-modal>
      <b-modal ref="calendar" hide-header hide-footer centered no-close-on-backdrop>
        <b-form-group id="calendarGroup"
        :label="`${selected.split(' - ')[0] } escolha a data que deseja reservar: `" class="mt-3">
          <b-input type="date" class="mt-4" size="sm"></b-input>
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
      }
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
    showModal() {
        this.$refs.alert.show()
    },
    exitCalendar() {
      this.$refs.calendar.hide()
      this.selected = 'null'
    }
  },
  watch: {
    'selected': function() {
      if(this.selected !== 'null')
      this.$refs.calendar.show()
    }
  }
  // mounted() {
  //   this.showModal()
  // }
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