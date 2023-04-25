//小程序首页轮播数据请求界面路由
const express = require('express');
const indexDataRouter = express.Router();

//导入路由方法模块
const { indexData_handler } = require('../router_handler/indexDataRouter');

//用户注册路由
indexDataRouter.get('/indexdata', indexData_handler);

module.exports = indexDataRouter;