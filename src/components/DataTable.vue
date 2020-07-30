<template>
    <div class="data-table">
        <div class="table-head">
            <data-table-per-page
				v-if="showPerPage"
				v-bind="bindingsPerPage"
				@setPerPage="setPerPage" />
            <data-table-search-filter
				v-if="showSearchFilter"
				v-bind="bindingsSearchFilter"
				@setSearch="setSearch" />
        </div>

        <div class="table-body">
            <data-table-table
				v-bind="bindingsTable"
				@sortColumn="sortColumn"
				@actionTriggered="actionTriggered"/>
        </div>

        <div class="table-footer">
            <data-table-entries-info
				v-if="showEntriesInfo"
				v-bind="bindingsEntriesInfo" />
            <data-table-pagination
				v-if="showPagination"
				v-bind="bindingsPagination"
				@setPage="setPage" />
            <data-table-export-data
				v-if="showDownloadButton"
				v-bind="bindingsExportData" />
        </div>
    </div>
</template>

<script src="./DataTable.js"></script>
<style src="./DataTable.scss" lang="scss" scoped></style>
