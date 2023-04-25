const express = require('express');
const router = express.Router();

const { setFeedback_handler } = require('../router_handler/setFeedback');

//上传意见反馈路由
router.post('/setFeedback', setFeedback_handler);

module.exports = router;