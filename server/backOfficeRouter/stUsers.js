//管理员获取所有用户数据路由
const express = require('express');
const router = express.Router();

const { stUsers_handler, updateUserMessage_handler, recoverUserMessage_handler, getRecord_handler } = require('../backOfficeRouter_handler/stUsersHandler');

//获取所有用户账号信息
router.get('/stUsers', stUsers_handler);

//获取所有用户申请记录信息
router.get('/getRecord', getRecord_handler);

//修改用户账号信息
router.post('/updateUserMessage', updateUserMessage_handler);

//恢复账号信息
router.post('/recoverUserMessage', recoverUserMessage_handler);

module.exports = router;