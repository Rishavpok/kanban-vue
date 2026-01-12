import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () =>
        import('@/pages/authentication/components/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import('@/pages/authentication/components/Registration.vue')
    },
    {
      path: '/',
      redirect: '/home',
      meta: { requireAuth: true }
    },
    {
      path: '/home',
      name: 'home',
      component: () =>
        import('@/views/BoardView.vue'),
      meta: { requireAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isLoggedIn = !!token

  const needsAuth = to.matched.some(r => r.meta.requireAuth)

  if (to.name === 'login' && isLoggedIn) {
    next({ name: 'home' })
    return
  }

  if (needsAuth && !isLoggedIn) {
    next({ name: 'login' })
    return
  }

  next()
})

export default router
