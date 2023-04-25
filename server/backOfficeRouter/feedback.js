//用户反馈信息界面路由
const express = require('express');

const router = express.Router();

const { getMessage_handler, deleteMessage_Handler } = require('../backOfficeRouter_handler/feedbackHandler')

//获取用户反馈信息接口
router.get('/getMessage', getMessage_handler);

//删除用户反馈信息接口
router.get('/deleteMessage', deleteMessage_Handler);

module.exports = router;