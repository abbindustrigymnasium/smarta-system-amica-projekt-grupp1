
const routes = [
  {
    path: '/',
    component: () => import('pages/User.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/AdminLogin',
    component: () => import('pages/AdminLogin.vue')
  },
  {
    path: '/Admin',
    component: () => import('pages/Admin.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
