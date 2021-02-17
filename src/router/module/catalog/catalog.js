export default [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/pages/home/index'),

        meta: {
            title: 'Home',
            requiresAuth: true,
        }

    },
]