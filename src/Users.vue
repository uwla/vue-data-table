<template>
    <div>
        <data-table v-bind="{parameters}"/>
    </div>
</template>

<script>


export default {
    name: "UsersDashboard",

    data() {
        return {
            keys: ['name', 'email', 'gender', 'country', 'job', 'city', 'created_at'],
        }
    },

    computed: {
        users() {
            return this.$store.state.users;
        },

        parameters() {
            return {
                data: this.users,
                actionColumn: 'multiple',
                columns: this.keys.map(key => ({key})),
            }
        },
    },
}
</script>
