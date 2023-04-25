//存放获取用户接口路由的表单验证规则
const joi = require('joi');

const thisMenuId = joi.number().min(1).required().error(new Error('参数错误，稍后再试'));
const studentsOrTeacher = joi.string().pattern(/^[a-z]{1,15}$/).required().error(new Error('参数错误，稍后再试'));

exports.schoolTitle = {
    body: {
        thisMenuId,
        studentsOrTeacher
    }
}