//存放优秀学生接口路由
const express = require('express');
const router = express.Router();

const { getExcellenceStudent, updateExcellenceStudent, setExcellenceStudent, deleteExcellenceStudent } = require('../backOfficeRouter_handler/excellenceStudentHandler');

const express_joi = require('@escook/express-joi');
const { setExcellenceStudent_joi } = require('../backOfficeFrom_joi/excellenceStudent_joi')

//获取优秀学生接口路由
router.get('/getStudent', getExcellenceStudent);

//修改添加优秀学生接口路由
router.post('/updateStudent', updateExcellenceStudent);

//添加优秀学生接口路由
router.post('/setStudent', express_joi(setExcellenceStudent_joi), setExcellenceStudent);


router.get('/deleteStudent', deleteExcellenceStudent);

module.exports = router