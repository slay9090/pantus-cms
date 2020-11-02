export default [

    {
        path: '/catalog/brands',
        name: 'Brands',
        component: () => import('@/views/catalog/brands-view.vue'),
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
        component: () => import('@/components/catalog/brands/brands-edit.vue'),
        props: route => ({ query: route.query.id }),
        meta: {
            requiresAuth: true,
        }

    },
]