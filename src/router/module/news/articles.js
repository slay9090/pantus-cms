export default [
    {

        path: '/news/articles',
        props: route => ({ query: route.query.page }),
        name: 'NewsArticles',
        component: () => import('@/pages/news/articles/news-article-list'),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Новости' },
                { name: 'Статьи' }
            ]
        }

    },
    { path: '/news/articles/edit',
        component: () => import('@/pages/news/articles/news-articles-edit'),
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
        component: () => import('@/pages/news/articles/news-articles-create'),
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