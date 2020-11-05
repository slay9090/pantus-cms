export default [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/pages/home'),

        meta: {
            title: 'Home',
            requiresAuth: true,
        }

    },
]