<template>
	<div class="data-table-pagination">
		<div class="pagination-search">
			<span>{{ paginationSearchText }}</span>
			<input
				@keyup.enter="setCurrentPage(pageToGo)"
				v-model="pageToGo"
				:max="numberOfPages"
				min="1"
				type="number"
				class="form-control"
			/>
			<button @click="setCurrentPage(pageToGo)" class="btn btn-primary">
				{{ paginationSearchButtonText }}
			</button>
		</div>
		<ul class="pagination">
			<li
				@click="setCurrentPage(previousPage)"
				:class="{ disabled: isFirstPage }"
				class="page-item">
				<span class="page-link">
					{{ previousButtonText }}
				</span>
			</li>
			<li
				v-for="(page, i) in pagination"
				:key="i"
				@click="setCurrentPage(page)"
				:class="{
					active: currentPage === page,
					disabled: page === '...'}"
				class="page-item">
				<span class="page-link">
					{{ page }}
				</span>
			</li>
			<li
				@click="setCurrentPage(nextPage)"
				:class="{ disabled: isLastPage }"
				class="page-item">
				<span class="page-link">
					{{ nextButtonText }}
				</span>
			</li>
		</ul>
	</div>
</template>
<script src="./Pagination.js"></script>
<style src="./Pagination.scss" lang="scss"></style>
