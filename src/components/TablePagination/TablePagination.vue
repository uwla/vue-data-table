<template>
    <div class="data-table-pagination">
        <div class="pagination-search">
            <span>{{ paginationSearchText }}</span>

            <input @keyup.enter="setCurrentPage(pageToGo)"
                    v-model="pageToGo"
                    type="number"
                    class="form-control"/>

            <button @click="setCurrentPage(pageToGo)" class="btn btn-primary">
                {{ paginationSearchButtonText }}
            </button>
        </div>

        <ul class="pagination">
            <li @click="setCurrentPage(previousPage)"
                :class="{ disabled: isFirstPage }"
                class="page-item">

                <span class="page-link">
                    {{ previousButtonText }}
                </span>
            </li>

            <li @click="setCurrentPage(page)"
                v-for="(page, index) in pages"
                :key="index"
                :class="{
                    disabled: page === '...',
                    active: currentPage === page}"
                class="page-item">

                <span class="page-link">
                    {{ page }}
                </span>
            </li>

            <li @click="setCurrentPage(nextPage)"
                :class="{ disabled: isLastPage }"
                class="page-item">

                <span class="page-link">
                    {{ nextButtonText }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script src="./TablePagination.js"></script>
<style src="./TablePagination.scss" lang="scss"></style>
