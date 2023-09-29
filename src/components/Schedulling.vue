<template>
  <div id="app">
    <h1>Estações</h1>
    <b-card id="seasons" v-for="(season, i) in workSeasons" :key="i">
      <b-row>
        <b-col md="1">
          <b-button id="status" :variant="season.variant" @click="change(i)"></b-button>
        </b-col>
        <b-col id="workSeasonName" md="3">
          {{ season.name }}
        </b-col>
        <b-col md="1">
          <div id="line" class=""></div>          
        </b-col>
        <b-col md="7">
          <b-form-select :disabled="season.avaiable">
            <option value="null" disabled selected>Selecione seu nome...</option>
            <option v-for="(col, i) in collaborators" :key="i">{{ col.name }}</option>
          </b-form-select>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "SchedulingComp",
  data() {
    return {
      workSeasons: [
        { name: "Mesa 1", avaiable: false, reserve: "", variant: 'success' },
        { name: "Mesa 2", avaiable: false, reserve: "", variant: 'success' },
        { name: "Mesa 3", avaiable: false, reserve: "", variant: 'success' },
        { name: "Mesa 4", avaiable: false, reserve: "", variant: 'success' },
        { name: "Mesa 5", avaiable: false, reserve: "", variant: 'success' },
        { name: "Mesa 6", avaiable: false, reserve: "", variant: 'success' },
        { name: "Mesa 7", avaiable: false, reserve: "", variant: 'success' },
        { name: "Mesa 8", avaiable: false, reserve: "", variant: 'success' },
        { name: "Mesa 9", avaiable: false, reserve: "", variant: 'success' },
        { name: "Mesa 10", avaiable: false, reserve: "", variant: 'success' },
      ],
      collaborators: []
    };
  },

  created() {
    this.dbConnect()
  },

  methods: {
    change(i) {
      Object.values(this.workSeasons)[i].variant = 'warning'
      Object.values(this.workSeasons)[i].avaiable = false
    },
    dbConnect() {
      this.$http('collaborators.json')
        .then((res) => {
          this.collaborators = res.data
        })
    }
  }
};
</script>

<style scoped>

#statusBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 68px;
}

#contentBox {
  width: 90%;
  background-color: gray;
}

#seasons {
  width: 48%;
  height: 70px;
  margin: auto;
  margin-top: 5px;
  display: inline-block;
  margin-right: 10px;
}


#status {
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  position: absolute;
}


#workSeasonName {
  /* border: 1px solid black; */
  height: 100%;
  font-size: 19px;
}


#line {
  rotate: 180deg;
  border: 1px solid gray;
  width: 1px;
  height: 30px;
}

#reserved {
  text-align: center;
}

</style>
