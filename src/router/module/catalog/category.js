export default [
    {

        path: '/catalog/category',
        name: 'CatalogCategory',
        component: () => import('@/pages/catalog/category/catalog-categories-list'),
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
        component: () => import('@/pages/catalog/category/catalog-category-edit'),
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
        component: () => import('@/pages/catalog/category/catalog-category-create'),
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