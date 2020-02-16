export default {
    name: "DataTablePagination",

    computed: {
        isLastPage() {
            return this.currentPage == this.numberOfPages;
        },

        isFirstPage() {
            return this.currentPage == 1;
        },

        previousPage() {
            return this.currentPage - 1;
        },

        nextPage() {
            return this.currentPage + 1;
        },
    },

    props: {
        numberOfPages: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
        nextButtonText: {
            type: String,
            required: true,
        },
        previousButtonText: {
            type: String,
            required: true,
        }
    },

    methods: {
        setCurrentPage(pageNumber) {
            if (pageNumber != this.currentPage && pageNumber > 0 && pageNumber <= this.numberOfPages) {
                this.$emit('pageClicked', pageNumber);
            }
        }
    }
};
