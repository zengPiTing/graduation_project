//存放获取用户接口路由的表单验证规则
const joi = require('joi');

const id = joi.number().required().error(new Error('id参数错误，稍后再试'));
const title = joi.string().min(1).required().error(new Error('标题输入错误，稍后再试'));
const text = joi.string().min(1).required().error(new Error('内容输入错误，稍后再试'));
const name = joi.string().min(1).required().error(new Error('姓名错误，稍后再试'));

//添加优秀学生校验规则
exports.setExcellenceStudent_joi = {
    body: {
        title,
        text,
        name
    }
}