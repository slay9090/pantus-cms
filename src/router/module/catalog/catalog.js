export default [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home'),

        meta: {
            title: 'Home',
            requiresAuth: true,
        }

    },
]