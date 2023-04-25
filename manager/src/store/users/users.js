//用户界面小仓库
import { getUsershandler } from '../../api/index'

const state = {
    user: [] //用户数据
}
const actions = {
    //获取用户数据
    async getUsers(context, data) {
        const result = await getUsershandler(data);
        if (result.status == 200) {
            context.commit('GETUSERS', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    }
}
const mutations = {
    //获取用户数据
    GETUSERS(state, data) {
        state.user = data.data
    }
}

export default {
    state,
    actions,
    mutations
}