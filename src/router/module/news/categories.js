export default [
    {

        path: '/news/category',
        name: 'NewsCategory',
        component: () => import('@/pages/news/categories/news-category-list'),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Новости' },
                { name: 'Категории' }
            ]
        }

    },
]