export default [

    {
        path: '/catalog/brands',
        name: 'Brands',
        component: () => import('@/pages/catalog/brands/index.vue'),
        // props: route => ({ query: route.query.page }),
        meta: {
            title: 'Бренды',
            requiresAuth: true,

            breadcrumb: [
                { name: 'Каталог' },
                { name: 'Бренды' }
            ]
        }
    },

    {
        path: '/catalog/brands/edit/:id',
        component: () => import('@/pages/catalog/brands/edit/index.vue'),
        meta: {
            title: 'Бренд редактирование',
            requiresAuth: true,
            breadcrumb: [
                { name: 'Каталог' },
                { name: 'Бренды', link: '/catalog/brands' },
                { name: 'Редактирование' },
            ]
        }

    },
]