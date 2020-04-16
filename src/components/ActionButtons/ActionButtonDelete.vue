<template>
    <button class="btn btn-outline-dark" @click="triggerAction()">
        <i class="fa fa-trash"></i>
    </button>
</template>

<script>
import ActionButton from './ActionButton'

export default {
    name: "DataTableActionButtonDelete",
    data: () => ({action: "delete"}),
    ...ActionButton
}
</script>

<style src="./ActionButton.css" lang="css"></style>
