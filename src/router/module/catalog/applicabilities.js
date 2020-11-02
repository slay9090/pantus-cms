export default [
    {

        path: '/catalog/applicabilities',
        name: 'CatalogApplicabilities',
        component: () => import('@/views/catalog/applicabilities-view'),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Каталог' },
                { name: 'Применяемости' }
            ]
        }

    },



    { path: '/catalog/applicabilities/edit',
        component: () => import('@/components/catalog/applicabilities/applicabilities-edit'),
        props: route => ({ query: route.query.id }),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Каталог' },
                { name: 'Применяемости', link: '/catalog/applicabilities/' },
                { name: 'Изменение' },
            ]
        }
    },

    { path: '/catalog/applicabilities/add',
        component: () => import('@/components/catalog/applicabilities/applicabilities-create'),
        name: 'applicabilitiesAdd',
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Каталог' },
                { name: 'Применяемости', link: '/catalog/applicabilities/'  },
                { name: 'Создание' },
            ]
        }
    },
]