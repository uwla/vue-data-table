<template>
    <div class="data-table-pagination">
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
