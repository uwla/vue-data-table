<template>
    <div class="data-table-pagination">
        <div class="pagination-search">
            <span>{{ paginationSearchText }}</span>
            
            <input type="number" class="form-control" v-model="pageToGo"
            @keyup.enter="setCurrentPage(pageToGo)">

            <button class="btn btn-primary" @click="setCurrentPage(pageToGo)">
                {{ paginationSearchButtonText }}
            </button>
        </div>
        <ul class="pagination">
            <li @click="setCurrentPage(previousPage)"
                class="page-item" :class="{disabled: isFirstPage}">

                <span class="page-link">
                    {{ previousButtonText }}
                </span>
            </li>

            <li v-for="(page, i) in pages" :key="i" @click="setCurrentPage(page)"
                class="page-item" :class="{disabled: page == '...', active: currentPage == page }">

                <span class="page-link" >
                    {{ page }}
                </span>
            </li>

            <li @click="setCurrentPage(nextPage)"
                class="page-item" :class="{disabled: isLastPage}">

                <span class="page-link">
                    {{ nextButtonText }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script src="./TablePagination.js"></script>
<style src="./TablePagination.scss" lang="scss"></style>
