import { createRouter, createWebHistory } from 'vue-router'
import BoardView from "@/views/BoardView.vue";
import Login from "@/pages/authentication/components/Login.vue";
import Registration from "@/pages/authentication/components/Registration.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path  :"/login",
            name : "login",
            component : Login
        },
        {
            path  :"/register",
            name : "register",
            component : Registration
        },
        {
            path : "/",
            redirect: '/home',
            meta : { requireAuth: true}
        },
        {
            path : '/home',
            name : 'Home',
            component : BoardView,
            meta : { requireAuth: true}
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token

    const needsAuth = to.matched.some(r => r.meta.requireAuth)

    if(to.name === 'login' && isLoggedIn ) {
        next({name: 'home'})
        return
    }

    if (needsAuth && !isLoggedIn ) {
        next({name: 'login'})
        return;
    }
    next()

})

export default router