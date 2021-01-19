<template>
	<div class="data-table-export-data">
		<span>{{ downloadText }}</span>
		<select class="form-control" v-model="selectedExport">
			<option
				v-for="(exportType, i) in allowedExports"
				:key="i"
				:value="exportType">
				{{ exportType }}
			</option>
		</select>
		<button class="btn btn-primary" @click="download()">
			{{ downloadButtonText }}
		</button>
	</div>
</template>
<script src="./ExportData.js"></script>
<style src="./ExportData.scss" lang="scss"></style>
