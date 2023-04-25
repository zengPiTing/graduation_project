// 用于存放后台系统获取用户信息路由模块的回调函数
const express = require('express');
const router = express.Router();

//joi验证规则
const { schoolTitle } = require('../backOfficeFrom_joi/getUsers_joi');
const express_joi = require('@escook/express-joi')

//回调函数
const { getUsersHandler } = require('../backOfficeRouter_handler/getUsersHandler');

router.post('/Message', express_joi(schoolTitle), getUsersHandler);

module.exports = router