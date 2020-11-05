export default [

    {
        path: '/catalog/brands',
        name: 'Brands',
        component: () => import('@/pages/catalog/brands/catalog-brands-list.vue'),
        props: route => ({ query: route.query.page }),
        meta: {
            title: 'brands',
            requiresAuth: true,

            breadcrumb: [
                { name: 'catalog' },
                { name: 'brands' }
            ]
        }
    },

    { path: '/catalog/brands/edit',
        component: () => import('@/pages/catalog/brands/catalog-brands-edit.vue'),
        props: route => ({ query: route.query.id }),
        meta: {
            requiresAuth: true,
        }

    },
]