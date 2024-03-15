<template>
    <main>
        <h1>VUE DATA TABLE DEMO</h1>

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
                    <InputText v-model="user.job" id="job" />
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
<script src="./App.ts"></script>
<style src="./App.css"></style>