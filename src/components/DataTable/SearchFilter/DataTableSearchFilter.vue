<template>
    <div class="data-table-search-filter">
        <span>{{ searchText }}</span>
        <input type="text" :value="search" @input="$store.commit('toggleSearch')">
    </div>
</template>

<script src="./DataTableSearchFilter.js"></script>
<style src="./DataTableSearchFilter.scss" lang="scss"></style>
