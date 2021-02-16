export default [
    {

        path: '/statistic/yandex',
        name: 'statisticYandex',
        component: () => import('@/pages/statistic/yandex/index'),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Статистика' },
                { name: 'Яндекс' }
            ]
        }

    },


]