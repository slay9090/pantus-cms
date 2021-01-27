export default [
    {

        path: '/crm/orders',
        name: 'Orders',
        component: () => import('@/pages/crm/orders/index'),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'CRM' },
                { name: 'Заказы' }
            ]
        }

    },

    //
    //
    // { path: '/catalog/applicabilities/edit',
    //     component: () => import('@/pages/catalog/applicabilities/catalog-applicabilities-edit'),
    //     props: route => ({ query: route.query.id }),
    //     meta: {
    //         requiresAuth: true,
    //         breadcrumb: [
    //             { name: 'Каталог' },
    //             { name: 'Применяемости', link: '/catalog/applicabilities/' },
    //             { name: 'Изменение' },
    //         ]
    //     }
    // },
    //
    // { path: '/catalog/applicabilities/add',
    //     component: () => import('@/pages/catalog/applicabilities/catalog-applicabilities-create'),
    //     name: 'applicabilitiesAdd',
    //     meta: {
    //         requiresAuth: true,
    //         breadcrumb: [
    //             { name: 'Каталог' },
    //             { name: 'Применяемости', link: '/catalog/applicabilities/'  },
    //             { name: 'Создание' },
    //         ]
    //     }
    // },
]