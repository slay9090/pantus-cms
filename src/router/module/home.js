import Home from "@/views/Home";

export default [
    {
        path: '/catalog',
        component: Home,
        name: 'Home2',

        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'catalog' }
            ]
        }
    },
]