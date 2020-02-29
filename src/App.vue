<template>

    <div id="app">
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
        <user-dashboard />
    </div>
</template>

<script>
import UserDashboard from './Users'
export default {
    name: "App",
    components: {
        UserDashboard
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
