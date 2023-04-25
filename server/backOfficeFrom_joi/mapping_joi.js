const joi = require('joi');

const id = joi.number().required().error(new Error('id参数错误'));

exports.getEveryUsers_joi = {
    query: {
        id
    }
}

exports.updateChoice_joi = {
    body: {
        id,
        teacher_id: id
    }
}