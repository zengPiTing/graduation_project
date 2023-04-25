//修改用户密码的路由模块

const express = require('express');
const updateRouter = express.Router();

//导入表单验证规则及验证表单数据验证
const { joi_update } = require('../backOfficeFrom_joi/manageUserRouter');
const express_joi = require('@escook/express-joi');

//导入修改密码路由方法模块
const { updatePassword_handler } = require('../backOfficeRouter_handler/manageUserRouter');
//用户修改密码路由
updateRouter.post('/manageUpdate', express_joi(joi_update), updatePassword_handler);

module.exports = updateRouter;