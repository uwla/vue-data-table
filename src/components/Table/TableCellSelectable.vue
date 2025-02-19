<template>
    <input
        class="vdt-cell-selectable"
        v-model="selected"
        @change="handleChange"
        type="checkbox"
    />
</template>
<script src="./TableCellSelectable.ts" lang="ts"></script>
<style src="./TableCellSelectable.scss" lang="scss"></style>
