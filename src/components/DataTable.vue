<template>
	<div class="data-table">
		<data-table-per-page
			v-if="showPerPage"
			v-bind="propsPerPage"
			@set-per-page="setPerPageFromUserInput"
		/>
		<data-table-search-filter
			v-if="showSearchFilter"
			v-bind="propsSearchFilter"
			@set-search="setSearch"
		/>
		<data-table-table
			v-bind="propsTable"
			@sort-column="sortColumn"
		/>
		<data-table-entries-info
			v-if="showEntriesInfo"
			v-bind="propsEntriesInfo"
		/>
		<data-table-pagination
			v-if="showPagination"
			v-bind="propsPagination"
			@set-page="setPage"
		/>
		<data-table-export-data
			v-if="showDownloadButton"
			v-bind="propsExportData"
		/>
	</div>
</template>
<script src="./DataTable.js"></script>
<style src="./DataTable.scss" lang="scss"></style>
