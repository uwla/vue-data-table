import users from "./users.json";
import Swal from "sweetalert2";

type User = {
    bio: String;
    city: String;
    company: String;
    country: String;
    created_at: String;
    creditCardNumber: String;
    creditCardType: String;
    email: String;
    email_verified_at: String;
    fruits: String[];
    gender: "Male" | "Female";
    id: Number;
    info: String;
    job: String;
    name: String;
    phone: String;
    photo: String;
    state: String;
    streetName: String;
    suffix: String;
    timezone: String;
    title: String;
    updated_at: String;
    userAgent: String;
    username: String;
};

type UserField = keyof User;

export default {
    data() {
        return {
            // user which will be edited or added
            user: {} as User,
            title: "UPDATE USER",

            // data for both tables
            data: users as User[],

            //
            userView: false,
            userEdit: false,

            // parameters for the first table
            params1: {
                sortingMode: "single",
                columns: [
                    { key: "name" },
                    { key: "email", title: "Email address" },
                    { key: "job" },
                    {
                        cssClass: "minwidth",
                        component: "vdt-actions",
                        componentProps: { actions: ["view"] },
                        title: "view",
                    },
                    {
                        cssClass: "minwidth",
                        component: "vdt-actions",
                        componentProps: { actions: ["edit"] },
                        title: "edit",
                    },
                    {
                        cssClass: "minwidth",
                        component: "vdt-actions",
                        componentProps: { actions: ["delete"] },
                        title: "delete",
                    },
                ],
            },

            // parameters for the second table
            params2: {
                columns: [
                    { key: "name", editable: true },
                    { key: "email", editable: true },
                    { key: "job", editable: true },
                    {
                        title: "actions",
                        cssClass: "minwidth",
                        component: "vdt-actions",
                        componentProps: { actions: ["view", "delete"] },
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
                    { key: "name" },
                    {
                        title: "Top 3 Favorite fruits",
                        component: "CellList",
                        searchFunction: (data: any, search: String) => {
                            return data.fruits.some((f: String) =>
                                f.toLowerCase().includes(search.toLowerCase())
                            );
                        },
                        searchable: true,
                    },
                    {
                        title: "Image",
                        component: "CellImage",
                        cssClass: "minwidth",
                    },
                ],
            },
        };
    },

    methods: {
        updateUserField(user: User, field: UserField, value: any) {
            let ind = this.data.findIndex((u) => u.id === user.id);
            if (ind < 0) return;
            let newUser = { ...this.data[ind] };
            newUser[field] = value;
            this.data.splice(ind, 1, newUser);
        },
        handleUserEvent(payload: any) {
            let user = payload.data as User;
            switch (payload.action) {
                case "delete":
                    this.showDeleteForm(user);
                    break;
                case "edit":
                    this.showEditForm(user);
                    break;
                case "view":
                    this.showUser(user);
                    break;
                case "updateCell":
                    let { key, value } = payload;
                    this.updateUserField(user, key, value);
            }
        },
        addUser(user: User) {
            user.id = this.data.length + 1;
            this.data.unshift(user);
            this.showSuccessMessage("User added!");
        },
        deleteUser(user: User) {
            this.data = this.data.filter((u) => u.id != user.id);
        },
        updateUser(user: User) {
            let index = this.data.findIndex((u) => u.id == user.id);
            this.data.splice(index, 1, user);
            this.showSuccessMessage("User updated!");
        },
        showUser(user: User) {
            this.user = { ...user };
            this.title = user.name;
            this.userView = true;
        },
        showEditForm(user: User) {
            this.title = "UPDATE USER";
            this.user = { ...user };
            this.userEdit = true;
        },
        showCreateForm() {
            this.title = "CREATE USER";
            this.user = {
                name: "",
                email: "",
                job: "",
                gender: "",
                info: "",
            };
            this.userEdit = true;
        },
        showDeleteForm(user: User) {
            Swal.fire({
                title: "Are you sure?",
                text: "You are about to delete this user!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteUser(user);
                    this.showSuccessMessage("User deleted!");
                }
            });
        },
        showSuccessMessage(message: string) {
            Swal.fire({
                title: "SUCCESS!",
                text: message,
                icon: "success",
                position: "bottom-end",
                toast: true,
                timer: 3000,
                showConfirmButton: false,
            });
        },
        submitForm() {
            const user = this.user;
            this.userEdit = false;
            if (user.id != null) this.updateUser(user);
            else this.addUser(user);
        },
    },
};
