import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Antd from "ant-design-vue";
import { createPinia } from "pinia";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
config.autoAddCss = false;
library.add(fas);
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(Antd);
app.use(pinia);
app.mount("#app");
