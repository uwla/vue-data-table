<template>
    <div class="data-table-search-filter">
        <span>{{ searchText }}</span>
        <input  type="text" :value="search" @input="$emit('setSearch')">
    </div>
</template>

<script src="./SearchFilter.js"></script>
<style src="./SearchFilter.scss" lang="scss"></style>
