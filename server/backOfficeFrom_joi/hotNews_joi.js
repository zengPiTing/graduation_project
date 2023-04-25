const joi = require('joi');

const id = joi.number().required().error(new Error('id参数有误'));
const img_text = joi.string().min(1).required().error(new Error('内容输入有误'));
const title = joi.string().min(1).required().error(new Error('标题输入有误'));

//修改热点新闻校验规则
exports.updateNews_joi = {
    body: {
        id,
        img_text,
        title
    }
};
// 添加热点新闻校验规则
exports.setNews_joi = {
    body: {
        img_text,
        title
    }
};

const school = joi.string().min(1).required().error(new Error('学院参数有误'));
// 修改专业数据校验规则
exports.updateSchool_joi = {
    body: {
        id,
        school,
        title
    }
};
//添加专业数据校验规则
exports.setSchool_joi = {
    body: {
        school,
        title
    }
}