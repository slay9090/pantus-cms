export default [
    {

        path: '/catalog/applicabilities',
        name: 'CatalogApplicabilities',
        component: () => import('@/pages/catalog/applicabilities/catalog-applicabilities-list'),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Каталог' },
                { name: 'Применяемости' }
            ]
        }

    },



    { path: '/catalog/applicabilities/edit',
        component: () => import('@/pages/catalog/applicabilities/catalog-applicabilities-edit'),
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
        component: () => import('@/pages/catalog/applicabilities/catalog-applicabilities-create'),
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