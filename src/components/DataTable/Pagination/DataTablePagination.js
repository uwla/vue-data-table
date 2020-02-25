import {mapGetters, mapState} from 'vuex'

export default {
    name: "DataTablePagination",

    computed: {
        ...mapGetters('dataTable', ['numberOfPages', 'currentPage']),
        ...mapState('dataTable', ['previousButtonText', 'nextButtonText']),

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

        pages() {
            let {numberOfPages: lastPage, currentPage, previousPage, nextPage} = this;

            if (lastPage == 1)
                return [1]

            if (lastPage <= 7)
                return Array(lastPage).fill(1).map((value, index) => value + index)

            if (lastPage > 7 && currentPage <= 4)
                return [1, 2, 3, 4, 5, '...', lastPage]

            if (lastPage > 8 && (lastPage > currentPage + 3) && lastPage > 4)
                return [1, '...', previousPage, currentPage, nextPage, '...', lastPage]

            if (lastPage > 7 && lastPage <= currentPage + 3)
                return [1, '...', lastPage - 3, lastPage - 2, lastPage - 1, lastPage]
        },
    },

    methods: {
        setCurrentPage(pageNumber) {
            if ((pageNumber != "...") && (pageNumber != this.currentPage) &&
                (pageNumber > 0) && (pageNumber <= this.numberOfPages))
                this.$store.commit('dataTable/setCurrentPage', pageNumber)
        }
    }
};
