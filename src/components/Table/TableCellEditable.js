export default {
    data() {
        return {
            isEditing: false,
            text: '',
        }
    },
    methods: {
        edit() {
            this.text = this.data[this.columnKey]
            this.isEditing = true
        },
        finishEditing(confirmation) {
            this.isEditing = false

            if (confirmation === false)
                return

            this.$emit('userEvent', {
                action: 'updateCell',
                data: this.data,
                key: this.columnKey ,
                value: this.text,
            })
        }
    },
    props: {
        data: Object,
        columnKey: String,
    },
}
