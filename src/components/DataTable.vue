<template>
    <div class="data-table">
		<data-table-per-page
			v-if="showPerPage"
			v-bind="bindingsPerPage"
			@setPerPage="setPerPageFromUserInput" />
		<data-table-search-filter
			v-if="showSearchFilter"
			v-bind="bindingsSearchFilter"
			@setSearch="setSearch" />
		<data-table-table
			v-bind="bindingsTable"
			@sortColumn="sortColumn"
			@actionTriggered="actionTriggered" />
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
</template>

<script src="./DataTable.js"></script>
<style src="./DataTable.scss" lang="scss"></style>
