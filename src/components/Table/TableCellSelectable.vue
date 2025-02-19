<template>
    <input
        v-model="selected"
        class="vdt-cell-selectable"
        type="checkbox"
        @change="handleChange"
    />
</template>
<script src="./TableCellSelectable.ts" lang="ts"></script>
<style src="./TableCellSelectable.scss" lang="scss"></style>
