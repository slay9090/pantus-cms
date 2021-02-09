export default [
    {

        path: '/news/articles',
        props: route => ({ query: route.query.page }),
        name: 'NewsArticles',
        component: () => import('@/pages/news/articles/index'),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Новости' },
                { name: 'Статьи' }
            ]
        }

    },

    {   path: '/news/articles/edit/:id',
        component: () => import('@/pages/news/articles/edit/index'),
        name: 'ArticlesFormEdit',
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Новости' },
                { name: 'Статьи', link: '/news/articles/'  },
                { name: 'Редактирование' },
            ]
        }
    },


    // { path: '/news/articles/edit',
    //     component: () => import('@/pages/news/articles/edit/index'),
    //     name: 'ArticlesFormEdit',
    //     meta: {
    //         requiresAuth: true,
    //         breadcrumb: [
    //             { name: 'Новости' },
    //             { name: 'Статьи', link: '/news/articles/'  },
    //             { name: 'Изменение' },
    //         ]
    //     }
    // },
    { path: '/news/articles/add',
        component: () => import('@/pages/news/articles/add/index'),
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