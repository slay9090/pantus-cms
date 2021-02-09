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
    {   path: '/crm/orders/edit/:id',
        component: () => import('@/pages/crm/orders/edit/index'),
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'CRM' },
                { name: 'Заказы', link: '/crm/orders' },
                { name: 'Редактирование' },
            ]
        }
    },
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