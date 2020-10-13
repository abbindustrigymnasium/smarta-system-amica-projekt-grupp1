// import store from '../store/auth/index'

const routes = [
  {
    path: '/',
    component: () => import('pages/User.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/AdminPage',
    component: () => import('pages/Admin.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Admin',
    component: () => import('pages/AdminLogin.vue')
    // children: [
    //   {
    //     path: '/Login',
    //     component: () => import('pages/Admin.vue'),
    //     meta: {
    //       requiresAuth: true
    //     }
    //   }
    // ]
  },
  // {
  //   path: '/Graph',
  //   component: () => import('pages/Graph.vue')
  // },
  {
    path: '/Request',
    component: () => import('pages/Request.vue')
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

// routes.beforeEach((to, from, next) => {
//   // const isLoggedIn = store.getters['auth', ['isAuthenticated']]
//   const isLoggedIn = store.getters['auth/isAuthenticated']

//   if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
//     next('/Admin')
//   }

//   next()
// })
export default routes
