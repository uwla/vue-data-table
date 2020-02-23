<template>
    <div id="app">
        <data-table :parameters="params"/>
    </div>
</template>

<script>
export default {
    name: "App",
    computed: {
        users() {
            return this.$store.state.users;
        },

        params() {
            return {
                data: this.users,
                columns: this.columns
            };
        }
    },

    data() {
        return {
            columns: [
                { data: "name", title: "Name" },
                { data: "email", title: "Email Address"},
                { data: "gender", title: "Gender"},
                { data: "city", title: "City"},
                { data: "country", title: "Country"},
                { data: "state", title: "State"},
                { data: "job", title: "Job"},
                { data: "company", title: "Company"},
                { data: "created_at", title: "Registered at" }
            ]
        };
    }
};
</script>

<style lang="css">
    #app {
        padding: 32px;
        min-height: 100vh;
        /* background: #f4f6f9; */
    }
</style>
