//登录、修改密码用户数据小仓库
import { loginUsers, update } from '../../api/index';

const state = {
    users: {}
}
const actions = {
    //用户登录
    async goLogin(context, data) {
        const result = await loginUsers(data);
        if (result.data.status == 0) {
            context.commit('GOLOGIN', result.data);
            //将token值存进本地
            localStorage.setItem('token', result.data.data.token);
            // 将个人信息存入本地
            localStorage.setItem('user', JSON.stringify(result.data.data.users));
            return 'ok'
        } else {
            return Promise.reject(new Error(result.data.message));
        }
    },
    //用户修改密码
    async updatePassword(context, data) {
        const result = await update(data);
        console.log(result);
        if (result.data.status == 0) {
            //修改成功后将本地数据清除，让重新登录
            localStorage.removeItem('token');
            return Promise.resolve(result.data.msg)
        } else {
            return Promise.reject(result.data.message)
        }
    }
}

const mutations = {
    GOLOGIN(state, data) {
        state.users = data;
    }
}

export default {
    state,
    actions,
    mutations
}