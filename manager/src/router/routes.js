//配置路由模块
import Login from '@/pages/Login.vue'
import Intro from '@/pages/Intro.vue'
import Institute from '@/pages/Institute.vue'
import Student from '@/pages/Student.vue'
import FeedBack from '@/pages/FeedBack.vue'
import Users from '@/pages/Users.vue'
import UserFrom from '@/pages/UserFrom.vue'
import StudentFrom from '@/pages/StudentFrom.vue'
import EveryUser from '@/pages/EveryUser.vue'
import EveryUserFrom from '@/pages/EveryUserFrom.vue'
import EveryUserShow from '@/pages/EveryUserShow.vue'

export default [{ //登录路由
        name: 'login',
        path: '/login',
        component: Login,
        meta: { isNewPage: true }
    },
    { //添加用户路由界面
        name: 'userfrom',
        path: '/userfrom',
        component: UserFrom,
        meta: { isNewPage: true }
    },
    { //平台简介路由
        name: 'intro',
        path: '/intro',
        component: Intro,
        meta: { isNewPage: false }
    },
    { //学院动态路由
        name: 'institute',
        path: '/institute',
        component: Institute,
        meta: { isNewPage: false }
    },
    { //学生风采路由
        name: 'student',
        path: '/student',
        component: Student,
        meta: { isNewPage: false }
    },
    { //处理反馈路由
        name: 'feedBack',
        path: '/feedBack',
        component: FeedBack,
        meta: { isNewPage: false }
    },
    { //所有用户账号路由
        name: 'everyUser',
        path: '/everyUser',
        component: EveryUser,
        meta: { isNewPage: false }
    },
    { //处理所有用户账号路由
        name: 'everyUserFrom',
        path: '/everyUserFrom',
        component: EveryUserFrom,
        meta: { isNewPage: true }
    },
    { //查看所有用户账号路由
        name: 'everyUserShow',
        path: '/everyUserShow',
        component: EveryUserShow,
        meta: { isNewPage: true }
    },
    { //处理对应专业用户信息路由
        name: 'users',
        path: '/users',
        component: Users,
        meta: { isNewPage: false }
    },
    { //处理优秀学生路由
        name: 'studentFrom',
        path: '/studentFrom',
        component: StudentFrom,
        meta: { isNewPage: true }
    },
    { //用于页面加载展示的路由
        path: "*",
        redirect: '/intro'
    }
]