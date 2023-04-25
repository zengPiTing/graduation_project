//导师意向界面小仓库
import { getEveryUsersHandler, updateChoiceHandler } from '../../api/index'

const state = {
    domainStudent: [], //当前专业学生
    domainTeacher: [] //当前专业老师
}
const actions = {
    //获取当前专业所有老师及学生
    async getEveryUsers(context, data) {
        let result = await getEveryUsersHandler(data);
        if (result.status == 200) {
            if (result.data.status == 0) {
                context.commit('GETEVERYUSERS', result.data.data);
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        } else {
            return Promise.reject(new Error(result.message));
        }

    },
    //解散师生匹配关系
    async updateChoice(context, data) {
        let result = await updateChoiceHandler(data);
        console.log(result);
        if (result.status == 200) {
            if (result.data.status == 0) {
                return result.data.msg;
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        } else {
            return Promise.reject(new Error(result.message));
        }
    }
}
const mutations = {
    GETEVERYUSERS(state, data) {
        state.domainStudent = data.student;
        state.domainTeacher = data.teacher;
    }
};
const getters = {
    teachers(state) {
        return state.domainTeacher.map(item => {
            let students = state.domainStudent.filter(value => value.daoshi_id == item.id);
            item.title = students;
            return item;
        });
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}