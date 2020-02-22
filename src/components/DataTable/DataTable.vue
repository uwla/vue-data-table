<template>
    <div class="data-table">
        <div class="data-table-head">
            <data-table-entries-length v-if="showEntriesLength" v-bind="{...params.entries, entryLength}"
                @select="toggleEntryLength"/>

            <data-table-search-filter v-if="showSearchFilter" v-bind="{...params.filter}"
                @input="toggleFiltering"/>
        </div>

        <div class="data-table-body">
            <data-table-wrapper v-bind="{...tableWrapperParams}" @sort="toggleSorting"/>
        </div>

        <div class="data-table-footer">
            <data-table-entries-info v-if="showEntriesInfo" v-bind="{...infoParams}"/>

            <data-table-pagination v-if="showPagination" v-bind="{... paginationParams}"
                @pageClicked="setCurrentPage"/>
        </div>

    </div>
</template>

<script src="./DataTable.js"></script>
<style src="./DataTable.scss" lang="scss"></style>
