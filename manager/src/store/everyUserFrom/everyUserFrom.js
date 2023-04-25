//存储修改所有用户账号的小仓库
import { updateUserMessageHandler, recoverUserMessageHandler } from '../../api/index'
const state = {}
const actions = {
    //修改用户账号信息
    async updateUserMessage(context, data) {
        let result = await updateUserMessageHandler(data);
        if (result.status == 200) {
            if (result.data.status == 0) {
                return result.data.msg
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    //恢复账号信息
    async recoverUserMessage(context, data) {
        let result = await recoverUserMessageHandler(data);
        if (result.status == 200) {
            if (result.data.status == 0) {
                return result.data.msg
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
}
const mutations = {}

export default {
    state,
    actions,
    mutations
}