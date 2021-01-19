<template>
	<div class="data-table-table">
		<table :class="tableClass">
			<thead>
				<tr>
					<th
						v-for="(column, i) in columns"
						:key="i"
						:data-sorting="column.sortingMode"
						:class="{ sortable: column.sortable }"
						class="column"
						@click="$emit('sort-column', column)">
						<div class="column-content">
							<span>{{ column.title }}</span>
							<component
								:index="column.sortingIndex"
								:is="sortingIndexComponent"
								v-if="column.sortingIndex > 0"
							/>
							<component
								:is="sortingIconComponent"
								v-if="column.sortable"
							/>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="isEmpty">
					<td :colspan="numberOfColumns" class="empty-table-cell">
						{{ emptyTableText }}
					</td>
				</tr>
				<tr v-for="(data, i) in dataDisplayed" :key="i">
					<td v-for="(column, j) in columns" :key="j">
						<component
							v-if="column.component"
							:is="column.component"
							:data="data"
						/>
						<span>{{ data[column.key] }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script src="./Table.js"></script>
<style src="./Table.scss" lang="scss"></style>
