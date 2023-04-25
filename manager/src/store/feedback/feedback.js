//用户反馈信息界面小仓库
import { getFeedbackHandler, deleteFeedbackHandler } from '../../api/index'
const state = {
    feedback: [] //用户反馈内容
};
const actions = {
    //获取用户反馈信息
    async getFeedback(context) {
        let result = await getFeedbackHandler();
        if (result.status == 200) {
            if (result.data.status == 0) {
                context.commit('GETFEEDBACK', result.data.data);
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //删除用户反馈信息
    async deleteFeedback(context, data) {
        const result = await deleteFeedbackHandler(data);
        if (result.status == 200) {
            if (result.data.status == 0) {
                return result.data.msg
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        } else {
            return Promise.reject(new Error(result.message));
        }
    }
};
const mutations = {
    GETFEEDBACK(state, data) {
        state.feedback = data;
    }
};
export default {
    state,
    actions,
    mutations
}