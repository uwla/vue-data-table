<template>
    <main>
        <h1>VDT DEMO</h1>

        <p>
            This is a sample dashboard using Vue Data Table.
            You can add, edit, delete and view users.
        </p>
        <p>
            There are three tables to showcase VDT's functionalities.
        </p>

        <Button @click="showCreateForm()">
            ADD USER
        </Button>

        <!-- TABLE 1 -->
        <h2>TABLE 1</h2>
        <p>This table shows a generic dashboard.</p>
        <vue-data-table v-bind="params1" :data="data" @userEvent="handleUserEvent" />

        <!-- TABLE 2 -->
        <h2>TABLE 2</h2>
        <p>This table allows editing cells.</p>
        <vue-data-table v-bind="params2" :data="data" @userEvent="handleUserEvent" />

        <!-- TABLE 3 -->
        <h2>TABLE 3</h2>
        <p>This table shows lists and images.</p>
        <vue-data-table v-bind="params3" :data="data" @userEvent="handleUserEvent" />

        <!-- MODAL DIALOG TO EDIT USERS -->
        <Dialog modal :header="title" v-model:visible="userEdit" :style="{ 'min-width': '400px' }">
            <form @submit.prevent="submitForm()">
                <div class="form-group">
                    <label for="name">Name</label>
                    <InputText v-model="user.name" id="name" />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <InputText v-model="user.email" id="email" type="email" />
                </div>
                <div class="form-group">
                    <label for="job">Job</label>
                    <InputText v-model="user.job" id="job"/>
                </div>
                <div class="form-group">
                    <label for="gender">Gender</label>
                    <select v-model="user.gender" id="gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="info">Info</label>
                    <Textarea v-model="user.info" rows="5" id="info" />
                </div>
                <div class="form-buttons">
                    <Button type="reset">CANCEL</Button>
                    <Button type="submit">SAVE</Button>
                </div>
            </form>
        </Dialog>

        <!-- DIALOG TO VIEW USERS -->
        <Dialog modal :header="title" v-model:visible="userView">
            <div style="max-width: 500px;">
                <b>Name</b>: <span>{{ user.name }}</span><br />
                <b>Email</b>: <span>{{ user.email }}</span><br />
                <b>Job</b>: <span>{{ user.job }}</span><br />
                <b>Bio</b>: <span>{{ user.bio }}</span>
            </div>
        </Dialog>
    </main>
</template>

<script>
import users from './users.json'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            // user which will be edited or added
            user: {},
            title: 'UPDATE USER',

            // data for both tables
            data: users,

            //
            userView: false,
            userEdit: false,

            // parameters for the first table
            params1: {
                sortingMode: 'single',
                columns: [
                    { key: 'name' },
                    { key: 'email', title: 'Email address' },
                    { key: 'job' },
                    {
                        cssClass: 'minwidth',
                        component: 'vdt-actions',
                        componentProps: { actions: ['view'] },
                        title: 'view',
                    },
                    {
                        cssClass: 'minwidth',
                        component: 'vdt-actions',
                        componentProps: { actions: ['edit'] },
                        title: 'edit',
                    },
                    {
                        cssClass: 'minwidth',
                        component: 'vdt-actions',
                        componentProps: { actions: ['delete'] },
                        title: 'delete',
                    },
                ],
            },

            // parameters for the second table
            params2: {
                columns: [
                    { key: 'name', editable: true, },
                    { key: 'email', editable: true, },
                    { key: 'job', editable: true, },
                    {
                        title: 'actions',
                        cssClass: 'minwidth',
                        component: 'vdt-actions',
                        componentProps: { actions: ['view', 'delete']},
                    },
                ],
            },

            // parameters for the third table
            params3: {
                defaultPerPage: 25,
                defaultColumn: {
                    sortable: false,
                },
                columns: [
                    { key: 'name' },
                    {
                        title: 'Top 3 Favorite fruits',
                        component: 'CellList',
                        searchFunction: (data, search) => {
                            return data.fruits.some(f => f.toLowerCase().includes(search.toLowerCase()))
                        },
                        searchable: true,
                    },
                    {
                        title: 'Image',
                        component: 'CellImage',
                        cssClass: "minwidth",
                    }
                ],
            },
        }
    },

    methods: {
        updateUserField(user, field, value) {
            let ind = this.data.findIndex(u => u.id === user.id)
            if (ind < 0) return
            let newUser = {... this.data[ind]}
            newUser[field] = value
            this.data.splice(ind, 1, newUser)
        },
        handleUserEvent(payload) {
            let user = payload.data
            switch (payload.action) {
                case 'delete':
                    this.showDeleteForm(user)
                    break
                case 'edit':
                    this.showEditForm(user)
                    break
                case 'view':
                    this.showUser(user)
                    break
                case 'updateCell':
                    let { key, value } = payload
                    this.updateUserField(user, key, value)
            }
        },
        addUser(user) {
            user.id = this.data.length + 1
            this.data.unshift(user)
            this.showSuccessMessage('User added!')
        },
        deleteUser(user) {
            this.data = this.data.filter((u) => u.id != user.id)
        },
        updateUser(user) {
            let index = this.data.findIndex((u) => u.id == user.id)
            this.data.splice(index, 1, user)
            this.showSuccessMessage('User updated!')
        },
        showUser(user) {
            this.user = { ...user }
            this.title = user.name
            this.userView = true
        },
        showEditForm(user) {
            this.title = 'UPDATE USER'
            this.user = { ...user }
            this.userEdit = true
        },
        showCreateForm() {
            this.title = 'CREATE USER'
            this.user = {
                name: '',
                email: '',
                job: '',
                gender: '',
                info: '',
            }
            this.userEdit = true
        },
        showDeleteForm(user) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You are about to delete this user!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteUser(user)
                    this.showSuccessMessage('User deleted!')
                }
            })
        },
        showSuccessMessage(message) {
            Swal.fire({
                title: 'SUCCESS!',
                text: message,
                icon: 'success',
                position: 'bottom-end',
                toast: true,
                timer: 3000,
                showConfirmButton: false,
            })
        },
        submitForm() {
            const user = this.user
            this.userEdit = false
            if (user.id != null) this.updateUser(user)
            else this.addUser(user)
        },
    },
}
</script>

<style type="text/css">
body {
    font-family: Arial;
}

main {
    margin: 1px auto;
    padding: 32px;
    display: block;
    max-width: 1200px;
}

.minwidth {
    width: 1px;
    text-align: center;
}

h1 {
    text-align: center;
    margin-bottom: 4rem;
}

main>h2 {
    margin-top: 3rem;
}

.p-dialog-mask {
    padding-left: 1.5em;
    padding-right: 1.5em;
}

.form-group {
    margin-bottom: 1em;
}

.form-group label {
    display: block;
    margin-bottom: .5em;
}

.form-buttons {
    display: flex;
    gap: 0.5em;
    
}

form textarea, form input, form .p-treeselect {
    width: 100%;
}

form select {
    width: 100%;
    display: block;
    padding: 0.75em;
}
</style>