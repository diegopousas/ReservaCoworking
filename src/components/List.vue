<template>
    <div>
        <p>Selecione o nome que deseja cancelar:
        <select v-model="selectedName">
            <option v-for="reserve of filteredNames">{{ reserve.nome }}</option>
        </select>
        <button class="btnCancelar" @click="cancel">Confirmar</button>
      </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedName: ''
        }
    },
    props: [ 'filteredNames' ],
    methods: {
        cancel() {
            this.$emit('canceled', this.selectedName)
        }
    }
}
</script>

<style>

</style>