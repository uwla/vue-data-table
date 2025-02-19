<template>
    <main>
        <h1>VUE DATA TABLE DEMO</h1>

        <p>
            This is a sample dashboard using Vue Data Table. You can add, edit,
            delete and view users.
        </p>
        <p>There are three tables to showcase VDT's functionalities.</p>

        <div class="btn-group">
            <Button @click="showCreateForm()">ADD USER</Button>
            <Button
                severity="danger"
                @click="deleteSelected()"
            >
                DELETE SELECTED
            </Button>
        </div>

        <h2>TABLE 1</h2>
        <p>This table shows a generic dashboard.</p>
        <vue-data-table
            v-bind="params1"
            :data="data"
            @user-event="handleUserEvent"
        />

        <h2>TABLE 2</h2>
        <p>This table allows editing cells.</p>
        <vue-data-table
            v-bind="params2"
            :data="data"
            @user-event="handleUserEvent"
        />

        <h2>TABLE 3</h2>
        <p>This table shows lists and images.</p>
        <vue-data-table
            v-bind="params3"
            :data="data"
            @user-event="handleUserEvent"
        />

        <!-- MODAL DIALOG TO EDIT USERS -->
        <Dialog
            v-model:visible="userEdit"
            modal
            :header="title"
            :style="{ 'min-width': '400px' }"
        >
            <form @submit.prevent="submitForm()">
                <div class="form-group">
                    <label for="name">Name</label>
                    <InputText
                        id="name"
                        v-model="user.name"
                    />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <InputText
                        id="email"
                        v-model="user.email"
                        type="email"
                    />
                </div>
                <div class="form-group">
                    <label for="job">Job</label>
                    <InputText
                        id="job"
                        v-model="user.job"
                    />
                </div>
                <div class="form-group">
                    <label for="gender">Gender</label>
                    <select
                        id="gender"
                        v-model="user.gender"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="info">Info</label>
                    <Textarea
                        id="info"
                        v-model="user.info"
                        rows="5"
                    />
                </div>
                <div class="form-buttons">
                    <Button type="reset">CANCEL</Button>
                    <Button type="submit">SAVE</Button>
                </div>
            </form>
        </Dialog>

        <!-- DIALOG TO VIEW USERS -->
        <Dialog
            v-model:visible="userView"
            modal
            :header="title"
        >
            <div style="max-width: 500px">
                <b>Name</b>
                :
                <span>{{ user.name }}</span>
                <br />
                <b>Email</b>
                :
                <span>{{ user.email }}</span>
                <br />
                <b>Job</b>
                :
                <span>{{ user.job }}</span>
                <br />
                <b>Bio</b>
                :
                <span>{{ user.bio }}</span>
            </div>
        </Dialog>
    </main>
</template>
<script src="./App.ts"></script>
<style src="./App.css"></style>
