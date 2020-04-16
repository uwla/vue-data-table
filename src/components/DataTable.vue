<template>
    <div class="data-table">
        <div class="data-table-head">
            <data-table-entries-length v-if="showEntriesLength" />
            <data-table-search-filter v-if="showSearchFilter" />
        </div>

        <div class="data-table-body">
            <data-table-wrapper />
        </div>

        <div class="data-table-footer">
            <data-table-entries-info v-if="showEntriesInfo" />
            <data-table-pagination v-if="showPagination" />
            <data-table-export-button v-if="showExportButton" />
        </div>
    </div>
</template>

<script src="./DataTable.js"></script>
<style src="./DataTable.scss" lang="scss"></style>
