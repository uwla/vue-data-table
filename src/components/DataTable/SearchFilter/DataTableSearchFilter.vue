<template>
    <div class="data-table-search-filter">
        <span>{{ text }}</span>
        <input type="text" @input="$emit('input')">
    </div>
</template>

<script src="./DataTableSearchFilter.js"></script>
<style src="./DataTableSearchFilter.scss" lang="scss"></style>
