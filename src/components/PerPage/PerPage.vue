<template>
	<div class="data-table-per-page">
		<span>{{ textBeforeOptions }}</span>
		<select @input="$emit('set-per-page')" :value="currentPerPage">
			<option
				v-for="(length, i) in perPageSizes"
				:key="i"
				:value="length"
			>
				{{ length }}
			</option>
		</select>
		<span>{{ textAfterOptions }}</span>
	</div>
</template>
<script src="./PerPage.js"></script>
<style src="./PerPage.scss" lang="scss"></style>
