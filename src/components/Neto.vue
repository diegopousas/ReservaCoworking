<template>
  <div id="data">
    <b-card title="Dados Informados">
        <b-card-text><strong>Nome: </strong> {{ $route.query.nome }}</b-card-text>
        <b-card-text><strong>Dado: </strong> {{ $route.query.dado }}</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
    name: 'RespostaTeste'
}
</script>

<style scoped>

#data {
    width: 50%;
    margin: auto;
    margin-top: 30px;
}


</style>