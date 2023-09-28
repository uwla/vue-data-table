import { defineComponent } from "vue"

export default defineComponent({
    name: "VdtPagination",
    data() {
        return {
            pageToGo: 1
        }
    },
    methods: {
        setCurrentPage(page: string|Number) {
            this.$emit("set-page", Number(page))
        }
    },
    props: {
        paginationSearchButtonText: String,
        paginationSearchText: String,
        previousButtonText: String,
        nextButtonText: String,
        isFirstPage: Boolean,
        isLastPage: Boolean,
        numberOfPages: Number,
        previousPage: Number,
        currentPage: Number,
        nextPage: Number,
        pagination: Array,
    },
    watch: {
        currentPage(value) {
            this.pageToGo = value
        },
        pageToGo(value: number) {
            if (value > (this.numberOfPages || 0)) {
                return this.numberOfPages
            }
            if (value < 1) {
                return 1
            }
            return value
        }
    }
})