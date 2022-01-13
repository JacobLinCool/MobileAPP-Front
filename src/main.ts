import "./index.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "sweetalert2/dist/sweetalert2.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "@vueform/multiselect/themes/default.css";

declare global {
    interface Window {
        LAR: VoidFunction;
    }
}

// Vue App Initialization
const app = createApp(App);
app.use(router);
app.use(store);
app.config.globalProperties.$window = window;
app.mount("#app");
