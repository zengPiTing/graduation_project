const joi = require('joi');

const daoshi_name = joi.string().pattern(/^[\u4e00-\u9fa5]{2,20}$/).required().error(new Error('导师姓名有误'));
const student_name = joi.string().pattern(/^[\u4e00-\u9fa5]{2,20}$/).required().error(new Error('参数有误，稍后再试'));
const studentRemark = joi.string().min(1).required().error(new Error('申请备注有误，稍后再试'));
const id = joi.number().min(1).required().error(new Error('参数有误，稍后再试'));
const time = joi.number().min(1).required().error(new Error('时间参数有误，稍后再试'));

exports.joi_choice = {
    body: {
        daoshi_name,
        id,
        submit_time: time,
        student_name,
        studentRemark
    }
}


const is_choice = joi.string().pattern(/^[\u4e00-\u9fa5]{0,10}$/).required().error(new Error('参数出错，稍后再试'));
exports.joi_studentList = {
    body: {
        is_choice
    }
}

const is_yes = joi.string().alphanum().required().error(new Error('参数出错，稍后再试'));
const comment = joi.string().min(1).error(new Error('导师寄语有误，稍后再试'));
exports.joi_choiseApply = {
    body: {
        is_yes,
        comment,
        daoshi_id: id,
        id,
        daoshi_name,
        reject_time: time,
        submit_time: time
    }
}