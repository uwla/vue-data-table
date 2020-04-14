<template>
    <div class="data-table-pagination">
        <div class="pagination-search">
            <span>{{ paginationSearchText }}</span>

            <input  type="number"
                    class="form-control"
                    v-model="pageToGo"
                    @keyup.enter="setCurrentPage(pageToGo)">

            <button class="btn btn-primary"
                    @click="setCurrentPage(pageToGo)">
                {{ paginationSearchButtonText }}
            </button>
        </div>
        <ul class="pagination">
            <li @click="setCurrentPage(previousPage)"
                :class="{disabled: isFirstPage}"
                class="page-item">

                <span class="page-link">
                    {{ previousButtonText }}
                </span>
            </li>

            <li v-for="(page, index) in pages"
                :key="index"
                @click="setCurrentPage(page)"
                :class="{disabled: (page === '...'), active: (currentPage === page)}"
                class="page-item">

                <span class="page-link" >
                    {{ page }}
                </span>
            </li>

            <li @click="setCurrentPage(nextPage)"
                :class="{disabled: isLastPage}"
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
