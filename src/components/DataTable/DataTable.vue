<template>
    <div class="data-table">
        <div class="data-table-head">
            <data-table-entries-length v-if="params.showEntriesLength"
                v-bind="{...params.entries, entryLength}" @select="toggleEntryLength"/>

            <data-table-search-filter v-if="params.showSearchFilter"
                v-bind="{...params.filter}" @input="toggleFiltering"/>
        </div>

        <div class="data-table-body">
            <data-table-wrapper v-bind="{data, columns, table: params.table, tableWrapper: params.tableWrapper}"
                @sort="toggleSorting"/>
        </div>

        <div class="data-table-footer">
            <data-table-entries-info v-if="params.showEntriesInfo" v-bind="{...infoParams}"/>

            <data-table-pagination v-if="params.showPagination"
                v-bind="{numberOfPages, currentPage, ...params.pagination}" @pageClicked="setCurrentPage"/>
        </div>

    </div>
</template>

<script src="./DataTable.js"></script>
<style src="./DataTable.scss" lang="scss"></style>
