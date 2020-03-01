<template>
    <div>
        <div>
            <button class="btn btn-success" data-toggle="add-user-form" @click="isAdding = true">
                Add user
            </button>
        </div>
        <data-table v-bind="{parameters}"/>

        <bootstrap-modal id="add-user-form" title="Add User" v-if="isAdding">
            <form @submit.prevent="addUser">
                <div class="form-group">
                    <label for="a-name">Name</label>
                    <input name="name" id="a-name" v-model="addForm.name"  type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label for="a-emaiil">Email</label>
                    <input name="email" id="a-email" v-model="addForm.email"  type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label for="a-country">Country</label>
                    <input name="country" id="a-country" v-model="addForm.country"  type="text" class="form-control">
                </div>
                <div>
                    <button class="btn btn-danger" type="button" data-dismiss="modal">
                        CANCEL
                    </button>
                    <button class="btn btn-success float-right" type="submit">
                        SAVE
                    </button>
                </div>
            </form>
        </bootstrap-modal>

        <bootstrap-modal id="edit-user-form" title="Edit User" v-if="isEditing">
            <form @submit.prevent="editUser">
                <div class="form-group">
                    <label for="a-name">Name</label>
                    <input name="name" id="e-name" v-model="editForm.name"  type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label for="a-emaiil">Email</label>
                    <input name="email" id="e-email" v-model="editForm.email"  type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label for="a-country">Country</label>
                    <input name="country" id="e-country" v-model="editForm.country"  type="text" class="form-control">
                </div>
                <div>
                    <button class="btn btn-danger" type="button" data-dismiss="modal">
                        CANCEL
                    </button>
                    <button class="btn btn-success float-right" type="submit">
                        SAVE
                    </button>
                </div>
            </form>
        </bootstrap-modal>

        <bootstrap-modal id="delete-user-form" title="Delete user" v-if="isDeleting">
            <h3 class="text-center">Are you sure?</h3>
            <p>You cannot revert this!</p>
            <div>
                <button class="btn btn-danger">NO, CANCEL</button>
                <button class="btn btn-success float-right" @click="deleteUser">YES, DELETE IT!</button>
            </div>
        </bootstrap-modal>
    </div>
</template>

<script>
import BootstrapModal from './components/BootstrapModal.vue'

export default {
    name: "UsersDashboard",

    components: {
        BootstrapModal
    },

    data() {
        let keys = ['name', 'email', 'gender', 'country', 'created_at'],
            form =  keys.reduce((obj, key) => {
                obj[key] = ""
                return obj
            }, {})

        return {
            isAdding: false,
            isEditing: false,
            isDeleting: false,
            keys,
            addForm: form,
            editForm: {... form, id: ""}
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
                actions: ['edit', 'delete'],
                columns: this.keys.map(key => ({key}))
            }
        },
    },

    created() {
        DataTableEventBus.$on('editData', data => {
            this.isEditing = true
            for (let key in this.editForm)
                this.editForm[key] = data[key]
        })

        DataTableEventBus.$on('deleteData', data => this.$store.dispatch('delete', data))
    },

    updated() {
        if (this.isAdding)
            $("#add-user-form").modal("show").on("hidden.bs.modal", () => this.isAdding = false)
        if (this.isEditing)
            $("#edit-user-form").modal("show").on("hidden.bs.modal", () => {
                this.isEditing = false
                for (let key in this.editForm)
                    this.editForm[key] = ""
            })
    },

    methods: {
        editUser() {
            this.$store.dispatch('update', {...this.editForm}).then(() => {
                $("#edit-user-form").modal("hide")
                this.isEditing = false

                for (let key in this.editForm)
                    this.addForm[key] = ""
            })
        },

        addUser() {
            this.$store.dispatch('create', {...this.addForm, id: Math.random(99999999)}).then(() => {
                $("#add-user-form").modal("hide")
                this.isAdding = false

                for (let key in this.addForm)
                    this.addForm[key] = ""
            })
        },

        deleteUser() {

        }
    }

}
</script>
