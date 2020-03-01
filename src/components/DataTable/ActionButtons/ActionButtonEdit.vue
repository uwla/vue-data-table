<template>
    <button class="btn btn-outline-primary" @click="triggerAction">
        <i class="fa fa-edit"></i>
    </button>
</template>

<script>
import ActionButton from './ActionButton'

export default {
    name: "DataTableActionButtonEdit",
    data: () => ({action: "edit"}),
    ...ActionButton
}
</script>

<style src="./ActionButton.css" lang="css"></style>
