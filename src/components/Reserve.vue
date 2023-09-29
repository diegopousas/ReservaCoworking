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
          <b-alert :show="alertAtts.state" :variant="alertAtts.variant" :dismissible="alertAtts.dimissible">{{ alertAtts.text }}</b-alert>
          <b-input type="date" class="mt-4" size="lg" v-model="date" :min="today"></b-input>
          <b-button variant="success" class="mt-4 mr-2" size="lg">Reservar</b-button>
          <b-button variant="info" class="mt-4" size="lg" @click="exitCalendar">Cancelar</b-button>
        </b-form-group>
      </b-modal>
    </b-form-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      alertAtts: {
        variant: '',
        text: '',
        state: false,
        dimissible: false
      },
      date: '',
    }
  },
  created() {
    this.dbConnection()
  },
  computed: {
    collaboratorsList() {
      return Object.values(this.collaborators)
    },
    today() {
      let date = new Date()
      let y = date.getFullYear()
      let m = String(date.getMonth() +1 ).padStart(2, '0')
      let d = String(date.getDate()).padStart(2, '0')
      let formatedDate = `${y}-${m}-${d}`
      return formatedDate
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
    },
    alert(variant, text, state, dimissible) {
      this.alertAtts.variant = variant
      this.alertAtts.text = text
      this.alertAtts.state = state
      this.alertAtts.dimissible = dimissible
    },
    // dateFormat() {
    //   let date = new Date()
    //   let y = date.getFullYear()
    //   let m = String(date.getMonth() +1 ).padStart(2, '0')
    //   let d = String(date.getDate()).padStart(2, '0')
    //   let formatedDate = `${y}-${m}-${d}`
    //   return formatedDate
    // }
  },
  watch: {
    'selected': function() {
      if(this.selected !== 'null')
      this.$refs.calendar.show()
    }
  },
}
</script>

<style scoped>

#calendarGroup {
  height: 170px;
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