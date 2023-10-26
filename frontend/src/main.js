import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

import Toast, { POSITION } from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

const toastOptions = {
    timeout: 5000,
    position: POSITION.BOTTOM_RIGHT
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, toastOptions);
app.mount('#app')
