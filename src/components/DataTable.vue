<template>
    <div class="vue-data-table">
        <vdt-per-page
            v-if="showPerPage"
            v-bind="propsPerPage"
            @set-per-page="setPerPageFromUserInput"
        />
        <vdt-search-filter
            v-if="showSearchFilter"
            v-bind="propsSearchFilter"
            @set-search="setSearch"
        />
        <vdt-table
            v-bind="propsTable"
            @sort-column="sortColumn"
            @user-event="emitUserEvent"
        />
        <vdt-entries-info
            v-if="showEntriesInfo"
            v-bind="propsEntriesInfo"
        />
        <vdt-pagination
            v-if="showPagination"
            v-show="numberOfPages !== 1"
            v-bind="propsPagination"
            @set-page="setPage"
        />
        <vdt-export-data
            v-if="showDownloadButton"
            v-bind="propsExportData"
        />
    </div>
</template>
<script src="./DataTable.ts" lang="ts"></script>
<style src="./DataTable.scss" lang="scss"></style>