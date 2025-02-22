import { createApp } from 'vue'
import App from './App.vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { PrSearch, IoCloseSharp } from "oh-vue-icons/icons";

const app = createApp(App)

addIcons(
    PrSearch, IoCloseSharp
)

app.component('v-icon', OhVueIcon)

app.mount('#app')
