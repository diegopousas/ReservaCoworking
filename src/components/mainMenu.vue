<template>
  <div>
    <ul>
      <router-link to="/" class="mr-5" tag="li" active-class="active" exact v-b-tooltip.bottom title="Inicio">
        <a>Inicio</a>
      </router-link>

      <router-link to="/register" class="mr-5" tag="li" active-class="active" exact v-b-tooltip.bottom title="Cadastro">
        <a>Cadastro</a>
      </router-link>

      <router-link to="/reserves" tag="li" class="mr-5" active-class="active" v-b-tooltip.bottom title="Reserva">
        <a>Reserva</a>
      </router-link>

    </ul>
  </div>
</template>

<script>
export default {
  name: "mainMenu",
};
</script>

<style scoped>
ul {
  width: 60%;
  margin: auto;
}

ul li {
  display: inline-block;
  color: gray;
  cursor: pointer;
}
ul li a {
  text-decoration: none;
  color: black;
}
.active {
  background-color: crimson;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 5px;
  color: white;
}

.active a {
  color: white;
}
</style>
