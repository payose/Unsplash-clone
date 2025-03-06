import { createApp } from 'vue';
import router from './router';
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import { OhVueIcon, addIcons } from 'oh-vue-icons';
// import { PrSearch, IoCloseSharp } from "oh-vue-icons/icons";

const app = createApp(App);

app.use(router); 

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

// addIcons(
//     PrSearch, IoCloseSharp
// )

// app.component('v-icon', OhVueIcon)

app.mount('#app')
