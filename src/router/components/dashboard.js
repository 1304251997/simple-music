export default [
    {
        path: '/home/mine',
        name: 'mine',
        component: () => import(/* webpackChunkName: "mine" */ '../../views/dashboard/mine/index.vue')
    }, {
        path: '/home/find',
        name: 'find',
        component: () => import(/* webpackChunkName: "find" */ '../../views/dashboard/find/index.vue')
    }, {
        path: '/home/village',
        name: 'village',
        component: () => import(/* webpackChunkName: "village" */ '../../views/dashboard/village/index.vue')
    }, {
        path: '/home/video',
        name: 'video',
        component: () => import(/* webpackChunkName: "mine" */ '../../views/dashboard/video/index.vue')
    }
]