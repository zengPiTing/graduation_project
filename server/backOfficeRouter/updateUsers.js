//管理员修改用户数据路由
const express = require('express');
const router = express.Router();

const expressjoi = require('@escook/express-joi');
const { updateTeacher_joi, updateStudent_joi, setStudent_joi } = require('../backOfficeFrom_joi/updateUser_joi');

const { updateTeacherHandler, updateStudentHandler, setStudentHandler, deleteTeacherHandler, deleteStudentHandler, getImgHandler } = require('../backOfficeRouter_handler/updateUserHandler');

//管理员修改增加老师用户接口
router.post('/updateUser/teacher', expressjoi(updateTeacher_joi), updateTeacherHandler);

//管理员删除老师用户接口路由
router.get('/delete/teacher', deleteTeacherHandler);

//管理员修改学生用户接口
router.post('/updateUsers/student', expressjoi(updateStudent_joi), updateStudentHandler);

//管理员添加学生用户数据接口
router.post('/setUsers/student', expressjoi(setStudent_joi), setStudentHandler);

//管理员删除学生用户接口路由
router.get('/delete/student', deleteStudentHandler);

router.post('/getImg/upload', getImgHandler);

module.exports = router