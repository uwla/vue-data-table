<template>
    <div>
        <ul class="pagination">
            <li @click="setCurrentPage(previousPage)"
                class="page-item" :class="{disabled: isFirstPage}">

                <span class="page-link">
                    {{ previousButtonText }}
                </span>
            </li>
            <!--
                // 7 -> display all : 1 2 3 4 5 6 7
                // 8 -> 1 2 3 4 5 ... 8
                // 9 -> 1 ... 4 5 6 ... 9
             -->
            <li v-for="i in numberOfPages" :key="i" @click="setCurrentPage(i)"
                class="page-item" :class="{disabled: currentPage == i}">

                <span class="page-link" >
                    {{ i }}
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

<script src="./DataTablePagination.js"></script>
<style src="./DataTablePagination.scss" lang="scss"></style>
