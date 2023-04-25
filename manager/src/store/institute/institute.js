//存放学院动态界面数据小仓库

import { getHotHandler, deleteNewHandler, updateSchoolHandler, setSchoolHandler, deleteSchoolHandler, recoverDomainHandler } from '../../api/index'

const state = {
    hotNews: [] //热点新闻数据
}
const actions = {
    //获取热点新闻数据
    async getHotNews(context, data) {
        const result = await getHotHandler();
        if (result.status == 200) {
            if (result.data.status == 0) {
                context.commit('GETHOTNEWS', result.data.data);
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //删除热点新闻数据
    async deletenew(context, data) {
        const result = await deleteNewHandler(data);
        if (result.status == 200) {
            if (result.data.status == 0) {
                return result.data.msg
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //修改专业数据
    async updateSchool(context, data) {
        const result = await updateSchoolHandler(data);
        if (result.status == 200) {
            if (result.data.status == 0) {
                return result.data.msg
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //新增专业数据
    async setSchool(context, data) {
        data.school = '智能科学与工程';
        const result = await setSchoolHandler(data);
        if (result.status == 200) {
            if (result.data.status == 0) {
                return result.data.msg
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //删除专业数据
    async deleteSchool(context, data) {
        const result = await deleteSchoolHandler(data);
        if (result.status == 200) {
            if (result.data.status == 0) {
                return result.data.msg
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //恢复专业数据
    async recoverDomain(context, data) {
        const result = await recoverDomainHandler(data);
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
}
const mutations = {
    GETHOTNEWS(state, data) {
        state.hotNews = data;
    }
}

export default {
    state,
    actions,
    mutations
}