//头部导航栏获取数据小仓库
import { headerTitle } from '../../api/index';

const state = {
    schooltitle: [], //未被删除的专业信息
}
const mutations = {
    GETSCHOOLTITLE(state, data) {
        state.schooltitle = data.data
    }
}
const actions = {
    async getSchoolTitle(context) {
        const result = await headerTitle();
        if (result.status == 200) {
            if (result.data.status == 0) {
                context.commit('GETSCHOOLTITLE', result.data);
                return 'ok'
            } else {
                //身份认证过期，让其重新登录
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                return Promise.reject(new Error(result.data.message));
            }
        } else {
            return Promise.reject(new Error(result.message));
        }
    }
}

export default {
    state,
    mutations,
    actions
}