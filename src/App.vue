<template>
    <div id="app">
        <data-table :parameters="{data: users, columns}"/>
    </div>
</template>

<script>
export default {
    name: "App",
    computed: {
        users() {
            return this.$store.state.users;
        },
    },

    data() {
        return {
            columns: [
                { data: "name"},
                { data: "email", title: "Email Address"},
                { data: "gender"},
                { data: "city"},
                { data: "country"},
                { data: "state"},
                { data: "job"},
                { data: "company"},
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
