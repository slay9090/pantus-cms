export default [
    {

        path: '/news/category',
        name: 'NewsCategory',
        component: () => import('@/views/news/category-view'),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Новости' },
                { name: 'Категории' }
            ]
        }

    },
]