import './assets/main.css'
import Toast from "vue-toastification";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";
import "vue-toastification/dist/index.css";


const app = createApp(App)
app.use(Toast, { position : "top-right" , timeout : 3000})
app.use(createPinia())
app.use(router)


app.mount('#app')

