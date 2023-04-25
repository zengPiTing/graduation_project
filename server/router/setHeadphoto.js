//放置用户上传头像的路由
const express = require('express');
const router = express.Router();

//导入回调函数
const { setHeadphotoHandler } = require('../router_handler/setHeadphotoHandler');
//导入验证规则
// const { joi_userHeadPhoto } = require('../input_joi/userRouter');
// const express_joi = require('@escook/express-joi')

// router.post('/setphoto', express_joi(joi_userHeadPhoto), setHeadphotoHandler);
router.post('/setphoto', setHeadphotoHandler);

module.exports = router