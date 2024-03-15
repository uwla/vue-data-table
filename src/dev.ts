import { createApp } from "vue";

// Prime Vue
import "primevue/resources/themes/lara-light-teal/theme.css";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Select from "primevue/treeselect";
import Dialog from "primevue/dialog";

// Import local components.
import { components } from "./main";
import App from "./demo/App.vue";
import CellList from "./demo/CellList.vue";
import CellImage from "./demo/CellImage.vue";

// Create the application.
const app = createApp(App);

// Register local components.
for (const name in components) {
    app.component(name, components[name]);
}
app.component("CellList", CellList);
app.component("CellImage", CellImage);

// Register PrimeVue components.
app.use(PrimeVue);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Textarea", Textarea);
app.component("Select", Select);
app.component("Dialog", Dialog);

// Mount the app.
app.mount("#app");
