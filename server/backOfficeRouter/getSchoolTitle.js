//后台获取用户数据路由模块

const express = require('express');
const router = express.Router();

const { getSchoolTitleHandler } = require('../backOfficeRouter_handler/getSchoolTitleHandler')

router.get('/getSchool', getSchoolTitleHandler);

module.exports = router