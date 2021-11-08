<template>
	<div class="data-table-search-filter">
		<span>{{ searchText }}</span>
		<input type="search" :value="search" @input="$emit('set-search')" />
	</div>
</template>
<script src="./SearchFilter.js"></script>
<style src="./SearchFilter.scss" lang="scss"></style>
