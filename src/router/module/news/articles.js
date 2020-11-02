export default [
    {

        path: '/news/articles',
        props: route => ({ query: route.query.page }),
        name: 'NewsArticles',
        component: () => import('@/views/news/article-view'),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Новости' },
                { name: 'Статьи' }
            ]
        }

    },
    { path: '/news/articles/edit',
        component: () => import('@/components/news/articles/articles-edit'),
        props: route => ({ query: route.query.id }),
        name: 'ArticlesFormEdit',
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Новости' },
                { name: 'Статьи', link: '/news/articles/'  },
                { name: 'Изменение' },
            ]
        }
    },
    { path: '/news/articles/add',
        component: () => import('@/components/news/articles/articles-create'),
        name: 'ArticlesFormAdd',
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Новости' },
                { name: 'Статьи', link: '/news/articles/'  },
                { name: 'Добавление' },
            ]
        }
    },
]