import { stUsersHandler, getRecordHandler } from '../../api/index';

const state = {
    everyStudent: [], //学生数据
    everyTeacher: [], //老师数据
    everyStudentNo: [], //已删除的学生用户
    everyTeacherNo: [], //已删除的老师用户
    records: [] //所有审批记录
};
const actions = {
    //获取所有用户数据接口
    async getEveryUsersData(context) {
        const result = await stUsersHandler();
        if (result.status == 200) {
            context.commit('GETEVERYUSERSDATA', result.data);
            return 'ok'
        }
    },
    //获取所有审批记录
    async getRecord(context) {
        const result = await getRecordHandler();
        if (result.status == 200) {
            context.commit('GETRECORD', result.data.data);
        } else {
            alert(result.message);
        }
    }
};
const mutations = {
    GETEVERYUSERSDATA(state, data) {
        state.everyStudent = data.everyUsers.everyStudent.filter(item => item.status == 0);
        state.everyTeacher = data.everyUsers.everyTeacher.filter(item => item.status == 0);
        state.everyStudentNo = data.everyUsers.everyStudent.filter(item => item.status == 1);
        state.everyTeacherNo = data.everyUsers.everyTeacher.filter(item => item.status == 1);
    },
    //获取所有审批记录
    GETRECORD(state, data) {
        state.records = data
    }
};
export default {
    state,
    actions,
    mutations
}