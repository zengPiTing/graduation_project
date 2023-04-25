//路由的配置文件
import Vue from 'vue';
//引入路由器并使用
import vueRouter from 'vue-router';
Vue.use(vueRouter);

//此处为了路由重复跳转时报警告
const originalPush = vueRouter.prototype.push;
//修改原型对象中的push方法
vueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

//导入路由模块
import routes from './routes';
const router = new vueRouter({
    routes
})

export default router;

//配置全局路由守卫，控制未登录状态不能查看具体信息
router.beforeEach((to, from, next) => {
    // console.log(from, to);//from从哪来，to是往哪去
    let isLogin = localStorage.getItem('token')
    if (isLogin) { //已登录状态并且去往其他界面
        next() //允许
    } else if (!isLogin && to.path !== '/login') { //未登陆并且还要去其他界面
        // console.log(next);
        next('/login') //让其跳转至登录界面
    } else { //未登陆去登陆路由
        next()
    }
})