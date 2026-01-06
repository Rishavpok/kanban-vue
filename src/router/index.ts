import { createRouter, createWebHistory } from 'vue-router'
import BoardView from "@/views/BoardView.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path : "/",
            redirect: '/home',
        },
        {
            path : '/home',
            name : 'Home',
            component : BoardView
        }
    ]
})

export default router