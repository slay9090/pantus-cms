export default [
    {

        path: '/catalog/category',
        name: 'CatalogCategory',
        component: () => import('@/views/catalog/categories-view'),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Каталог' },
                { name: 'Категории' }
            ]
        }

    },



    { path: '/catalog/category/edit',
        name: 'categoryEdit',
        component: () => import('@/components/catalog/category/category-edit'),
        props: route => ({ query: route.query.id }),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Каталог' },
                { name: 'Категории', link: '/catalog/category/' },
                { name: 'Изменение' },
            ]
        }
    },


    { path: '/catalog/category/add',
        component: () => import('@/components/catalog/category/category-create'),
        name: 'categoryAdd',
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Каталог' },
                { name: 'Категории', link: '/catalog/category/' },
                { name: 'Создание' },
            ]
        }
    },
]