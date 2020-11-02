export default [
    {
        path: '/products/list',
        props: route => ({ query: route.query.page }),
        name: 'ProductsList',
        component: () => import('@/views/products/parts-view'),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Продукты' },
                { name: 'Список' }
            ]
        }
    },

    { path: '/products/list/edit',
        component: () => import('@/components/products/edit/product-editor'),
        props: route => ({ query: route.query.id }),
        name: 'ProductFormEdit',
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Продукты' },
                { name: 'Список', link: '/products/list/'  },
                { name: 'Изменение' },
            ]
        }
    },
]