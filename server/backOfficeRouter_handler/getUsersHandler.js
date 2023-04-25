//用于存放后台系统获取用户信息路由模块的回调函数

const db = require('../MySQL/mysql')

exports.getUsersHandler = (req, res) => {
    const { thisMenuId, studentsOrTeacher } = req.body;
    // 老师用户
    if (studentsOrTeacher == 'teachers') {
        const sql = 'select * from user_teacher where domain_id=? and status=0';
        db.query(sql, thisMenuId, (err, result) => {
            if (err) return res.cc(err);
            if (result.length < 0) return res.cc('请求出错');
            res.send({
                status: 0,
                msg: '请求成功',
                data: result
            })
        })
    } else {
        //请求出学生用户中对应专业名称
        const sqlSchool = 'select title from show_title where id=?'
        db.query(sqlSchool, thisMenuId, (errSchool, resultSchool) => {
            if (errSchool) return res.cc(errSchool);
            if (resultSchool.length !== 1) return res.cc('请求出错');
            // 以对应专业获取对应学生
            const sql = 'select * from user_students where domain=? and status=0'
            db.query(sql, resultSchool[0].title, (err, result) => {
                if (err) return res.cc(err);
                if (result.length < 0) return res.cc('请求出错');
                res.send({
                    status: 0,
                    msg: '请求成功',
                    data: result
                })
            })
        })
    }
}