const router = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            icon: 'home',
            path: '/welcome',
            name: 'homepage',
            component: './Welcome',
          },
          {
            icon: 'setting',
            path: '/system',
            name: 'system',
            // authority: ['admin'],
            routes: [
              {
                path: '/system/admin',
                name: 'admin',
                component: './Admin',
              }
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]

export default router