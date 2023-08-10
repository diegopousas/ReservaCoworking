<template>
    <div>
        <p>Selecione o nome que deseja cancelar:
            <select v-model="selectedName">
                <option v-for="reserve in filteredNames">{{ reserve.name }}</option>
            </select>
            <b-button class="btnCancelar mr-1" size="sm" variant="success" @click="cancel">Efetuar Cancelamento</b-button>
            <b-button size="sm" variant="secondary" @click="$emit('goHome')">Voltar ao inicio</b-button>
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