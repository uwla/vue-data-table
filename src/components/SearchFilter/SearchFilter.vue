<template>
    <div class="data-table-search-filter">
        <span>
            {{ searchText }}
        </span>
        <input  type="text"
                :value="search"
                @input="$store.commit('dataTable/toggleSearch')">
    </div>
</template>

<script src="./SearchFilter.js"></script>
<style src="./SearchFilter.scss" lang="scss"></style>
