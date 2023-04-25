//仓库store的核心文件
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//引入小仓库
import login from './login/login'
import header from './header/header';
import users from './users/users'
import userFrom from './userFrom/userFrom';
import institute from './institute/institute';
import excellenceStudent from './excellenceStudent/excellenceStudent'
import mapping from './mapping/mapping';
import feedback from './feedback/feedback';
import everyUsers from './everyUsers/everyUsers';
import everyUserFrom from './everyUserFrom/everyUserFrom';
export default new Vuex.Store({
    modules: {
        login,
        header,
        users,
        userFrom,
        institute,
        excellenceStudent,
        mapping,
        feedback,
        everyUsers,
        everyUserFrom
    }
})