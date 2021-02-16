export default [
    {

        path: '/statistic/google',
        name: 'statisticGoogle',
        component: () => import('@/pages/statistic/google/index'),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Статистика' },
                { name: 'Google' }
            ]
        }

    },


]