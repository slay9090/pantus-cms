export default [

    {
        path: '*',
        name: '404',
        component: () => import('@/pages/error-page-not-found'),
        meta: {
            title: '404',
            requiresAuth: true,
        }
    },

]