<template>
    <div>
        <p>Selecione o nome que deseja cancelar:
        <select v-model="selectedName">
            <option v-for="reserve of filteredNames">{{ reserve.name }}</option>
        </select>
        <b-button class="btnCancelar" @click="cancel">Confirmar</b-button>
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