export default [

    {
        path: '*',
        name: '404',
        component: () => import('@/components/client-error'),
        meta: {
            title: '404',
            requiresAuth: true,
        }
    },

]