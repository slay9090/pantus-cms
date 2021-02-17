import Home from "@/pages/home/index";

export default [
    {
        path: '',
        name: 'home',
        component: () => import('@/pages/home/index'),
        meta: {
            title: 'home',
            requiresAuth: true,
        }

    },
]