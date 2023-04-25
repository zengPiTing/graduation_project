// 热点新闻路由模块

const express = require('express');
const router = express.Router();

const express_joi = require('@escook/express-joi');
const { updateSchool_joi, setSchool_joi } = require('../backOfficeFrom_joi/hotNews_joi');

const { getHotNewsHandler, updateHotNewHandler, deleteHotNewHandler, updateSchoolHandler, setSchoolHandler, deleteSchoolHandler, recoverDomainHandler } = require('../backOfficeRouter_handler/getHotNewsHandler')

// 获取热点新闻接口路由
router.get('/getHotNews', getHotNewsHandler);

//修改热点新闻接口路由
router.post('/updateHotNew', updateHotNewHandler);


//删除热点新闻接口路由
router.get('/deleteNew', deleteHotNewHandler);

//修改专业数据接口路由
router.post('/updateSchool', express_joi(updateSchool_joi), updateSchoolHandler);

//添加专业数据接口路由
router.post('/setSchool', express_joi(setSchool_joi), setSchoolHandler);

//删除专业接口路由
router.get('/deleteSchool', deleteSchoolHandler);

//恢复专业接口
router.get('/recoverDomain', recoverDomainHandler)

module.exports = router