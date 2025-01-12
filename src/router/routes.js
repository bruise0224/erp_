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
                name: '首页',
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
                        name:'送签社管理',
                        component:()=> import('@/views/COLLECT_INFO/COLLECT_INFO.vue')
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
                path: '/VISIT_INFO',
                component: () => import('@/views/VISIT_INFO/index.vue'),
                children: [
                    //VISIT_INFO##路由-文件##
                    {
                        path: 'VISIT_INFO',
                        name: '酒店添加',
                        component: () => import('@/views/VISIT_INFO/VISIT_INFO.vue')
                    },
                ]
            },

            {
                path: '/fapiaoshangchuan',
                component: () => import('@/views/fapiaoshangchuan/index.vue'),
                children: [
                    //VISIT_INFO##路由-文件##
                    {
                        path: 'fapiaoshangchuan',
                        name: '发票上传',
                        component: () => import('@/views/fapiaoshangchuan/fapiaoshangchuan.vue')
                    },
                ]
            },

            {
                path: '/zaqizaba',
                component: () => import('@/views/zaqizaba/index.vue'),
                children: [
                    //VISIT_INFO##路由-文件##
                    {
                        path: 'plandetil',
                        name: '详细行程管理',
                        component: () => import('@/views/zaqizaba/plandetil.vue')
                    },
                    {
                        path: 'jiudianadd',
                        name: '酒店操作',
                        component: () => import('@/views/zaqizaba/jiudianadd.vue')
                    },
                    {
                        path: 'yudingadd',
                        name: '修改&打印预定',
                        component: () => import('@/views/zaqizaba/yudingadd.vue')
                    },
                    {
                        path: 'huizongbiao_hotel',
                        name: '酒店入住汇总表查询与导出',
                        component: () => import('@/views/zaqizaba/huizongbiao_hotel.vue')
                    },
                    {
                        path: 'huizongbiao1',
                        name: '汇总表1导出',
                        component: () => import('@/views/zaqizaba/huizongbiao1.vue')
                    },
                    {
                        path: 'huizongbiao2',
                        name: '汇总表2导出',
                        component: () => import('@/views/zaqizaba/huizongbiao2.vue')
                    },
                    {
                        path: 'huizongbiao3',
                        name: '汇总表3导出',
                        component: () => import('@/views/zaqizaba/huizongbiao3.vue')
                    },
                    {
                        path: 'fankuibiao_hotel',
                        name: '酒店反馈表',
                        component: () => import('@/views/zaqizaba/fankuibiao_hotel.vue')
                    },
                    {
                        path: 'lirunbiao',
                        name: '利润表导出',
                        component: () => import('@/views/zaqizaba/lirunbiao.vue')
                    },
                    {
                        path: 'tixingkuang',
                        name: '重复录入提醒演示',
                        component: () => import('@/views/zaqizaba/tixingkuang.vue')
                    },
                    {
                        path: 'jiudianshaixuan',
                        name: '酒店筛选功能展示',
                        component: () => import('@/views/zaqizaba/jiudianshaixuan.vue')
                    },
                    
                ]
            },

            {
                path: '/infor_print',
                component: () => import('@/views/infor_print/index.vue'),
                children: [
                    //VISIT_INFO##路由-文件##
                    {
                        path: 'invite_print',
                        name: '打印邀请信',
                        component: () => import('@/views/infor_print/invite_print.vue')
                    },
                    {
                        path: 'ADS_print',
                        name: '打印ADS行程',
                        component: () => import('@/views/infor_print/ADS_print.vue')
                    },
                    {
                        path: 'ADSSING_print',
                        name: '打印ADS SIGN',
                        component: () => import('@/views/infor_print/ADSSING_print.vue')
                    },
                    {
                        path: 'pingzheng_print',
                        name: '打印凭证单',
                        component: () => import('@/views/infor_print/pingzheng_print.vue')
                    },
                ]
            },


            {
                path: '/Change',
                component: () => import('@/views/Change/index.vue'),
                children: [
                    //VISIT_INFO##路由-文件##
                    {
                        path: 'all_change',
                        name: '修改团信息',
                        component: () => import('@/views/Change/all_change.vue')
                    },
                    {
                        path: 'base_infor',
                        name: '更新团信息',
                        component: () => import('@/views/Change/base_infor.vue')
                    },
                    {
                        path: 'plan_manage',
                        name: '行程管理',
                        component: () => import('@/views/Change/plan_manage.vue')
                    },
                    {
                        path: 'people_list',
                        name: '游客名单',
                        component: () => import('@/views/Change/people_list.vue')
                    },
                    {
                        path: 'order_manage',
                        name: '预定管理',
                        component: () => import('@/views/Change/order_manage.vue')
                    },
                    {
                        path: 'message_print',
                        name: '信息打印',
                        component: () => import('@/views/Change/message_print.vue')
                    },
                ]
            },

            {
                path: '/edit',
                component: () => import('@/views/edit/index.vue'),
                children: [
                    //BOOK_INFO##路由-文件##
                    {
                        path: 'edit_hotel',
                        name: '酒店',
                        component: () => import('@/views/edit/edit_hotel.vue')
                    },
                    {
                        path: 'edit_scenic',
                        name: '景点',
                        component: () => import('@/views/edit/edit_scenic.vue')
                    },
                    {
                        path: 'edit_restaurant',
                        name: '餐厅',
                        component: () => import('@/views/edit/edit_restaurant.vue')
                    },
                    {
                        path: 'edit_car',
                        name: '车队',
                        component: () => import('@/views/edit/edit_car.vue')
                    },
                    {
                        path: 'edit_guide',
                        name: '领队',
                        component: () => import('@/views/edit/edit_guide.vue')
                    },
                    {
                        path: 'edit_liaisons',
                        name: '联络人',
                        component: () => import('@/views/edit/edit_liaisons.vue')
                    },
                ]
            },

            {
                path: '/manage',
                component: () => import('@/views/manage/index.vue'),
                children: [
                    //BOOK_INFO##路由-文件##
                    {
                        path: 'manage_submission',
                        name: '送签社管理',
                        component: () => import('@/views/manage/manage_submission.vue')
                    },
                    {
                        path: 'manage_city',
                        name: '城市管理',
                        component: () => import('@/views/manage/manage_city.vue')
                    },
                    {
                        path: 'manage_star',
                        name: '星级管理',
                        component: () => import('@/views/manage/manage_star.vue')
                    },
                    {
                        path: 'manage_embassy',
                        name: '使馆管理',
                        component: () => import('@/views/manage/manage_embassy.vue')
                    },
                ]
            },

            {
                path: '/edit',
                component: () => import('@/views/edit/index.vue'),
                children: [
                    //BOOK_INFO##路由-文件##
                    {
                        path: 'edit_hotel',
                        name: '酒店',
                        component: () => import('@/views/edit/edit_hotel.vue')
                    },
                    {
                        path: 'edit_scenic',
                        name: '景点',
                        component: () => import('@/views/edit/edit_scenic.vue')
                    },
                    {
                        path: 'edit_restaurant',
                        name: '餐厅',
                        component: () => import('@/views/edit/edit_restaurant.vue')
                    },
                    {
                        path: 'edit_car',
                        name: '车队',
                        component: () => import('@/views/edit/edit_car.vue')
                    },
                    {
                        path: 'edit_guide',
                        name: '领队',
                        component: () => import('@/views/edit/edit_guide.vue')
                    },
                    {
                        path: 'edit_liaisons',
                        name: '联络人',
                        component: () => import('@/views/edit/edit_liaisons.vue')
                    },
                ]
            },

            {
                path: '/jiudiandan',
                component: () => import('@/views/jiudiandan/index.vue'),
                children: [
                    //BOOK_INFO##路由-文件##
                    {
                        path: 'jiudiandan',
                        name: '酒店单',
                        component: () => import('@/views/jiudiandan/jiudiandan.vue')
                    },
                    {
                        path: 'jiudianbiao',
                        name: '酒店表',
                        component: () => import('@/views/jiudiandan/jiudianbiao.vue')
                    },
                    {
                        path: 'dingchedan',
                        name: '订车单',
                        component: () => import('@/views/jiudiandan/dingchedan.vue')
                    },
                    {
                        path: 'lirunbiao',
                        name: '利润表',
                        component: () => import('@/views/jiudiandan/lirunbiao.vue')
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
                        name: '酒店信息',
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
            {
                name: '财务审批模块',
                path: '/my_application',
                component: () => import('@/views/my_application/index.vue'),
                children: [
                    ///my_application##路由-文件##
                    {
                        name: '我的申请',
                        path: 'my_application',
                        component: () => import('@/views/my_application/my_application.vue')
                    },

                    {
                        name: '团支出申请',
                        path: 'group_expense',
                        component: () => import('@/views/my_application/group_expense.vue')
                    },

                    {
                        name: '报销信息',
                        path: 'reimbursement_info',
                        component: () => import('@/views/my_application/reimbursement_info.vue')
                    },
                ]
            },

        ]
    },
]


export default routers