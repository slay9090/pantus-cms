import Home from "@/pages/home";

export default [
    {
        path: '',
        name: 'home',
        component: () => import('@/pages/home'),
        meta: {
            title: 'home',
            requiresAuth: true,
        }

    },
]