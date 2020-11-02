export default [
    {
        path: '/test',
        name: 'Test',
        component: () => import('@/components/test-bench/Test'),
        meta: {
            title: 'test',
            requiresAuth: true,
        }

    },
]