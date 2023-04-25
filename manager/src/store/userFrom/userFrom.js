//存放用户管理界面增删改查用户数据小仓库
//导入request函数做异步请求
import { updateTeacherHandler, updateStudentHandler, setStudentHandler, deleteTeacherHandler, deleteStudentHandler } from '../../api/index'

const actions = {
    //增改老师用户数据
    async teacherUpdate(context, value) {
        //处理数据
        value.isManager == '普通老师' ? value.isManager = 1 : value.isManager = 0;
        value.teacherClass = value.type.join('、');
        value.id == '' ? value.id = -1 : '';
        //发请求增改老师数据
        let result = await updateTeacherHandler(value);
        if (result.status == 200) {
            if (result.data.status == 0) {
                let user = JSON.parse(localStorage.getItem('user'));
                if (result.data.data && result.data.data.id == user.id && user.isTeacher == 0) {
                    localStorage.setItem('user', JSON.stringify(result.data.data));
                }
                return result.data.msg
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //删除老师数据
    async deleteTeacher(context, value) {
        const result = await deleteTeacherHandler(value);
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
    //修改学生用户数据
    async StudentUpdate(context, value) {
        // 处理数据
        value.isManager == '普通学生' ? value.isManager = 1 : value.isManager = 0;
        const result = await updateStudentHandler(value);
        if (result.status == 200) {
            if (result.data.status == 0) {
                let user = JSON.parse(localStorage.getItem('user'));
                if (result.data.data.id == user.id && user.isTeacher == 1) {
                    localStorage.setItem('user', JSON.stringify(result.data.data));
                }
                return result.data.msg
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    // 增加学生用户数据
    async teacherSet(context, value) {
        // 处理数据
        value.isManager == '普通学生' ? value.isManager = 1 : value.isManager = 0;
        const result = await setStudentHandler(value);
        if (result.status == 200) {
            console.log(result);
            if (result.data.status == 0) {
                return result.data.msg
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    // 删除学生用户数据
    async deleteStudent(context, value) {
        const result = await deleteStudentHandler(value);
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
}
const mutations = {}
const state = {}

export default {
    actions,
    mutations,
    state
}