//存放导师意向管理界面路由

const express = require('express');
const router = express.Router();

const { getEveryUsers_joi, updateChoice_joi } = require('../backOfficeFrom_joi/mapping_joi');
const express_joi = require('@escook/express-joi')

const { getEveryUsers_handler, updateChoice_Handler } = require('../backOfficeRouter_handler/mappingHandler');

//获取当前专业用户数据回调接口
router.get('/getEveryUsers', express_joi(getEveryUsers_joi), getEveryUsers_handler);

//解除用户匹配关系回调接口
router.post('/updateChoice', express_joi(updateChoice_joi), updateChoice_Handler);

module.exports = router;