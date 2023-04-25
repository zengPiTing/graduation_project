//用户注册路由首页
const express = require('express');
const userRouter = express.Router();

//导入表单验证规则及验证表单数据验证
const { joi_user } = require('../backOfficeFrom_joi/manageUserRouter');
const express_joi = require('@escook/express-joi');

//导入登录路由方法模块
const { lodin_handler } = require('../backOfficeRouter_handler/manageUserRouter');
//用户登录路由
userRouter.post('/manageLogin', express_joi(joi_user), lodin_handler);

module.exports = userRouter;