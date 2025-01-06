const routers = [
    {
        path: '/',
        component: () => import('@/views/Login.vue'),
    },
    {
        name: 'login',
        path: '/Login',
        component: () => import('@/views/Login.vue')
    },
    {
        name: '404',
        path: '/:catchAll(.*)*',
        component: () => import('@/views/404.vue')
    },
    {
        name: 'layout',
        path: '/Layout',
        component: () => import('@/views/Layout/index.vue'),
        children: [
            {
                name: '工作提醒',
                path: '/Welcome',
                component: () => import('@/views/Welcome/index.vue'),
            },
            //##路由-文件夹##
            {
                path:'/COLLECT_INFO',
                component:()=>import('@/views/COLLECT_INFO/index.vue'),
                children:[
                    //COLLECT_INFO##路由-文件##
                    {
                        path:'COLLECT_INFO',
                        name:'搜更多团',
                        component:()=> import('@/views/COLLECT_INFO/COLLECT_INFO.vue')
                    },
                ]
            },
            {
                path: '/VISIT_INFO',
                component: () => import('@/views/VISIT_INFO/index.vue'),
                children: [
                    //VISIT_INFO##路由-文件##
                    {
                        path: 'VISIT_INFO',
                        name: '查找游客信息',
                        component: () => import('@/views/VISIT_INFO/VISIT_INFO.vue')
                    },
                ]
            },

            {
                path: '/DISTRIBUTION_INFO',
                component: () => import('@/views/DISTRIBUTION_INFO/index.vue'),
                children: [
                    //DISTRIBUTION_INFO##路由-文件##
                    {
                        path: 'DISTRIBUTION_INFO',
                        name: '3D分布',
                        component: () => import('@/views/DISTRIBUTION_INFO/DISTRIBUTION_INFO.vue')
                    },
                ]
            },
            {
                path: '/BORROW_INFO',
                component: () => import('@/views/BORROW_INFO/index.vue'),
                children: [
                    //BORROW_INFO##路由-文件##                                       
                    {
                        path: 'BORROW_INFO',
                        name: '我的审批',
                        component: () => import('@/views/BORROW_INFO/BORROW_INFO.vue')
                    },
                ]
            },
            {
                path: '/BORROW_INFO',
                component: () => import('@/views/BORROW_INFO/index.vue'),
                children: [
                    //BORROW_INFO##路由-文件##                    
                    {
                        path:'PRE_BORROW_INFO',
                        name:'借阅意向清单',
                        component:()=> import('@/views/BORROW_INFO/PRE_BORROW_INFO.vue')
                    },
                                        
                    {
                        path: 'BORROW_INFO',
                        name: '查找游客',
                        component: () => import('@/views/BORROW_INFO/BORROW_INFO.vue')
                    },
                ]
            },
            {
                path: '/BOOK_INFO',
                component: () => import('@/views/BOOK_INFO/index.vue'),
                children: [
                    //BOOK_INFO##路由-文件##
                    {
                        path: 'BOOK_INFO',
                        name: '旅行团信息',
                        component: () => import('@/views/BOOK_INFO/BOOK_INFO.vue')
                    },
                ]
            },

            {
                path: '/Group_list',
                component: () => import('@/views/Group_list/index.vue'),
                children: [
                    //BOOK_INFO##路由-文件##
                    {
                        path: 'Group_list',
                        name: '团列表',
                        component: () => import('@/views/Group_list/Group_list.vue')
                    },
                ]
            },
            {
                path: '/yuwei_list',
                component: () => import('@/views/yuwei_list/index.vue'),
                children: [
                    //BOOK_INFO##路由-文件##
                    {
                        path: 'yuwei_list',
                        name: '团余位表',
                        component: () => import('@/views/yuwei_list/yuwei_list.vue')
                    },
                ]
            },

            {
                path: '/edit',
                component: () => import('@/views/edit/index.vue'),
                children: [
                    //BOOK_INFO##路由-文件##
                    {
                        path: 'edit_submit',
                        name: '送签修改',
                        component: () => import('@/views/edit/edit_submit.vue')
                    },
                    {
                        path: 'edit_plan',
                        name: '行程修改',
                        component: () => import('@/views/edit/edit_plan.vue')
                    },
                    {
                        path: 'edit_operate',
                        name: '操作修改',
                        component: () => import('@/views/edit/edit_operate.vue')
                    },
                    {
                        path: 'edit_guide',
                        name: '领票修改',
                        component: () => import('@/views/edit/edit_guide.vue')
                    },
                    {
                        path: 'edit_price',
                        name: '团价修改',
                        component: () => import('@/views/edit/edit_price.vue')
                    },
                ]
            },

            {
                path: '/add',
                component: () => import('@/views/add/index.vue'),
                children: [
                    //BOOK_INFO##路由-文件##
                    {
                        path: 'addtuan',
                        name: '建设新团',
                        component: () => import('@/views/add/addtuan.vue')
                    },
                    {
                        path: 'xiugaituan',
                        name: '修改团信息',
                        component: () => import('@/views/add/xiugaituan.vue')
                    },
                ]
            },

            {
                path: '/data_collect',
                component: () => import('@/views/data_collect/index.vue'),
                children: [
                    //BOOK_INFO##路由-文件##
                    {
                        path: 'data_collect',
                        name: '数据统计',
                        component: () => import('@/views/data_collect/data_collect.vue')
                    },
                ]
            },
            {
                name: '用户管理模块',
                path: '/USER_INFO',
                component: () => import('@/views/USER_INFO/index.vue'),
                children: [
                    //USER_INFO##路由-文件##
                    {
                        name: '用户管理',
                        path: 'USER_INFO',
                        component: () => import('@/views/USER_INFO/USER_INFO.vue')
                    },
                ]
            },
        ]
    },
]

export default routers