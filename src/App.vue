<template>

    <div id="app">
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
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
                actionColumnText: "Ações",
                actionColumn: 'multiple',
                actionColumnsText: {view: "Ver", edit: "Editar", delete: "Deletar"},
                entriesLengthText: "Exibindo :entries dados por página",
                infoText: "Mostrando :first à :last de :total dados",
                infoTextFiltered: "Mostrando :first à :last de :filtered (filtrado de :total dados)",
                nextButtonText: "Próximo",
                previousButtonText: "Anterior",
                searchText: "Pesquisar:",
                columns: [
                    { key: "name", title: "Nome"},
                    //{ key: "email", title: "Email"},
                    //{ key: "gender", title: "Sexo"},
                    //{ key: "city", title: "Cidade"},
                    { key: "country", title: "País"},
                    //{ key: "state"},
                    { key: "job", title: "Emprego"},
                    //{ key: "company", title: "Empresa"},
                    //{ key: "created_at", title: "Registered at" }
                ]
            }
        }
    },
};
</script>

<style lang="css">
    #app {
        padding: 32px;
        min-height: 100vh;
        /* background: #f4f6f9; */
    }
</style>
