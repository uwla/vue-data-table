<template>
    <div class="vdt-pagination">
        <div class="vdt-pagination-search">
            <span>{{ paginationSearchText }}</span>
            <input v-model="pageToGo"
                class="vdt-input"
                :min="1"
                :max="numberOfPages"
                type="number"
                @keyup.enter="setCurrentPage(pageToGo)" />
            <button @click="setCurrentPage(pageToGo)" class="vdt-btn vdt-btn-primary">
                {{ paginationSearchButtonText }}
            </button>
        </div>
        <ul class="vdt-pagination-items">
            <li class="vdt-page-item"
                :class="{ disabled: isFirstPage }"
                @click="setCurrentPage(previousPage)">
                <span class="vdt-page-link">
                    {{ previousButtonText }}
                </span>
            </li>
            <li v-for="(page, i) in pagination" :key="i"
                class="vdt-page-item"
                :class="{ active: currentPage === page, disabled: page === '...'}"
                @click="setCurrentPage(page)">
                <span class="vdt-page-link">
                    {{ page }}
                </span>
            </li>
            <li class="vdt-page-item" @click="setCurrentPage(nextPage)"
                :class="{ disabled: isLastPage }">
                <span class="vdt-page-link">
                    {{ nextButtonText }}
                </span>
            </li>
        </ul>
    </div>
</template>
<script src="./Pagination.ts" lang="ts"></script>
<style src="./Pagination.scss" lang="scss"></style>