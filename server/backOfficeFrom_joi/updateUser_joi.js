const joi = require('joi');

const nickname = joi.string().pattern(/^[\u4e00-\u9fa5A-Za-z]{2,20}$/).required().error(new Error('姓名错误，稍后再试'));
const username = joi.string().alphanum().pattern(/^[A-Za-z0-9]{6,20}$/).min(6).max(20).required().error(new Error('账号有误,6到20位数字字母账号'));
const password = joi.string().alphanum().pattern(/^[A-Za-z0-9]{6,20}$/).min(6).max(20).required().error(new Error('密码格式有误，6到20位数字字母密码'));
const email = joi.string().min(1).max(20).required().error(new Error('用户联系方式错误，稍后再试'));
const school = joi.string().min(1).required().error(new Error('用户学院错误，稍后再试'));
const domain_id = joi.number().min(0).required().error(new Error('用户专业有误，稍后再试'));
const isManager = joi.number().min(0).required().error(new Error('用户管理分类错误，稍后再试'));
const awards = joi.string().min(1).required().error(new Error('用户简介错误，稍后再试'));
const education = joi.string().min(1).required().error(new Error('用户教育背景错误，稍后再试'));
const epr = joi.string().min(1).required().error(new Error('用户领域技能错误，稍后再试'));
const teacherClass = joi.string().min(1).required().error(new Error('用户职称错误，稍后再试'));
const photo = joi.string().min(1).required().error(new Error('照片错误，稍后再试'));
const isTeacher = joi.number().min(0).required().error(new Error('分类参数错误，稍后再试'));
const id = joi.number().error(new Error('id参数错误，稍后再试'));

//老师用户增改数据
exports.updateTeacher_joi = {
    body: {
        nickname,
        photo,
        username,
        password,
        email,
        school,
        domain_id,
        isManager,
        awards,
        education,
        epr,
        teacherClass,
        isTeacher,
        id
    }
}

const student_dorm = joi.string().min(1).required().error(new Error('宿舍填写错误，稍后再试'));
const _class = joi.string().min(1).required().error(new Error('班级填写错误，稍后再试'));
const enrol_year = joi.string().min(4).max(4).required().error(new Error('入学年份填写错误，稍后再试'));
const minzu = joi.string().min(1).required().error(new Error('民族填写错误，稍后再试'));
const jiguan = joi.string().min(1).required().error(new Error('籍贯填写错误，稍后再试'));
const date_birth = joi.string().min(1).required().error(new Error('时间填写错误，稍后再试'));
//修改学生用户数据
exports.updateStudent_joi = {
    body: {
        id,
        nickname,
        photo,
        student_number: username,
        password,
        student_phone: email,
        school,
        student_dorm,
        _class,
        enrol_year,
        minzu,
        jiguan,
        date_birth,
        domain_id,
        isManager,
    }
}

// 增加学生用户数据
exports.setStudent_joi = {
    body: {
        nickname,
        student_number: username,
        password,
        isManager,
        isTeacher
    }
}