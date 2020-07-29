<template>
    <button class="btn btn-outline-success" @click="triggerAction()">
        <i class="fa fa-eye"></i>
    </button>
</template>

<script>
import ActionButton from './ActionButton'

export default {
    name: "DataTableActionButtonView",
    data: () => ({action: "view"}),
    ...ActionButton
}
</script>

<style src="./ActionButton.scss" lang="scss" scoped></style>
