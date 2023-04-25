import { getExcellenceStudentHandler, deleteExcellenceStudentHandler } from '../../api/index'

const state = {
    excellenceStudent: [] //优秀学生
}
const actions = {
    //获取优秀学生数据
    async getExcellenceStudent(context) {
        const result = await getExcellenceStudentHandler();
        if (result.data.status == 0) {
            context.commit('GETEXCELLENCESTUDENT', result.data.data);
        }
    },
    //修改优秀学生数据
    // async updateExcellenceStudent(context, data) {
    //     const result = await updateExcellenceStudentHandler(data);
    //     if (result.status == 200) {
    //         if (result.data.status == 0) {
    //             return result.data.msg
    //         } else {
    //             return Promise.reject(new Error(result.data.message));
    //         }
    //     } else {
    //         return Promise.reject(new Error(result.message));
    //     }
    // },
    //添加优秀学生数据
    // async setExcellenceStudent(context, data) {
    //     const result = await setExcellenceStudentHandler(data);
    //     if (result.status == 200) {
    //         if (result.data.status == 0) {
    //             return result.data.msg
    //         } else {
    //             return Promise.reject(new Error(result.data.message));
    //         }
    //     } else {
    //         return Promise.reject(new Error(result.message));
    //     }
    // },
    //删除优秀学生数据
    async deleteExcellenceStudent(context, data) {
        const result = await deleteExcellenceStudentHandler(data);
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
    GETEXCELLENCESTUDENT(state, value) {
        state.excellenceStudent = value
    }
}

export default {
    state,
    actions,
    mutations
}