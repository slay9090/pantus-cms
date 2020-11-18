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

    { path: '/news/category/edit',
        component: () => import('@/pages/news/categories/news-categories-edit'),
        props: route => ({ query: route.query.id }),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Новости' },
                { name: 'Категории', link: '/news/category' },
                { name: 'Редактирование' },
            ]
        }

    },
]