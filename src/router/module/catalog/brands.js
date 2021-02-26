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
        name: 'BrandsEdit',
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

    {
        path: '/catalog/brands/descriptions/edit/:id',

        component: () => import('@/pages/catalog/brands/descriptions/edit/index'),
        meta: {
            title: 'Редактирование описания',
            requiresAuth: true,
            breadcrumb: [
                { name: 'Каталог' },
                { name: 'Бренды', link: '/catalog/brands' },
                { name: 'Описание' },
                { name: 'Редактирование' },
            ]
        }

    },

    {
        path: '/catalog/brands/descriptions/create',
        name: 'BrandsDescriptionCreate',
        component: () => import('@/pages/catalog/brands/descriptions/create/index'),
        meta: {
            title: 'Создание описания',
            requiresAuth: true,
            breadcrumb: [
                { name: 'Каталог' },
                { name: 'Бренды', link: '/catalog/brands' },
                { name: 'Описание' },
                { name: 'Создание' },
            ]
        }

    },
]