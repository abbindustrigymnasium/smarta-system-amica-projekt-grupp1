
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/Admin',
    component: () => import('pages/Admin.vue')
  },
  {
    path: '/User',
    component: () => import('pages/User.vue')
  },

  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
