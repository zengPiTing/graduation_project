//放置获取所有用户数据的接口
const db = require('../MySQL/mysql');

//管理员获取所有用户信息数据
exports.stUsers_handler = (req, res) => {
    const sqlTeacher = 'select * from user_teacher';
    const sqlStudent = 'select * from user_students';
    db.query(sqlStudent, (errStudent, resultStudent) => {
        if (errStudent) return res.cc(errStudent);
        let everyStudent = resultStudent;
        db.query(sqlTeacher, (errTeacher, resultTeacher) => {
            if (errTeacher) return res.cc(errTeacher);
            let everyTeacher = resultTeacher;
            res.send({
                msg: '请求成功',
                status: 0,
                everyUsers: {
                    everyStudent,
                    everyTeacher
                }
            })
        })
    })
};

//管理员获取所有审批信息数据
exports.getRecord_handler = (req, res) => {
    const sql = 'select * from record';
    db.query(sql, (err, result) => {
        if (err) return res.cc(err);
        if (result.length < 1) return res.cc('暂无记录');
        res.send({
            msg: '请求成功',
            status: 0,
            data: result
        })
    })
}

//管理员用户修改用户账号信息
exports.updateUserMessage_handler = (req, res) => {
    if (req.body.isTeacher == '0') { //老师用户
        //首先查看是否已经有此用户
        const sqlHaveTeacher = 'select * from user_teacher where username=?'
        const sqlHaveStudent = 'select * from user_students where student_number=?'
        db.query(sqlHaveTeacher, req.body.username, (errHaveTeacher, resultHaveTeacher) => {
            //查看老师用户中是否有此用户名
            if (errHaveTeacher) return res.cc(errHaveTeacher);
            if (resultHaveTeacher.length == 1 && resultHaveTeacher[0].id !== req.body.id) return res.cc('用户账号已存在');
            db.query(sqlHaveStudent, req.body.username, (errHaveStudent, resultHaveStudent) => {
                //查看学生用户中是否有此用户名
                if (errHaveStudent) return res.cc(errHaveStudent);
                if (resultHaveStudent.length > 0) return res.cc('用户账号已存在');
                const sql_teacher = 'update user_teacher set ? where id=?';
                db.query(sql_teacher, [req.body, req.body.id], (errs, results) => {
                    if (errs) return res.cc(errs);
                    if (results.affectedRows !== 1) return res.cc('修改失败，稍后再试');
                    res.send({
                        status: 0,
                        msg: '修改成功'
                    })
                })
            })
        })
    } else { //学生用户
        const sqlHaveTeacher = 'select * from user_teacher where username=?'
        const sqlHaveStudent = 'select * from user_students where student_number=?'
        db.query(sqlHaveTeacher, req.body.student_number, (errHaveTeacher, resultHaveTeacher) => {
            //查看老师用户中是否有此用户名
            if (errHaveTeacher) return res.cc(errHaveTeacher);
            if (resultHaveTeacher.length > 0) return res.cc('用户账号已存在');
            db.query(sqlHaveStudent, req.body.student_number, (errHaveStudent, resultHaveStudent) => {
                //查看学生用户中是否有此用户名
                if (errHaveStudent) return res.cc(errHaveStudent);
                if (resultHaveStudent.length == 1 && resultHaveStudent[0].id !== req.body.id) return res.cc('用户账号已存在');
                const sql_student = 'update user_students set ? where id=?';
                db.query(sql_student, [req.body, req.body.id], (errs, results) => {
                    if (errs) return res.cc(errs);
                    if (results.affectedRows !== 1) return res.cc('修改失败，稍后再试');
                    res.send({
                        status: 0,
                        msg: '修改成功'
                    })
                })
            })
        })
    }
}

//管理员用户恢复用户账号信息
exports.recoverUserMessage_handler = (req, res) => {
    if (req.body.isTeacher == '0') { //老师用户
        const sql_teacher = 'update user_teacher set status=0 where id=?';
        db.query(sql_teacher, req.body.id, (errs, results) => {
            if (errs) return res.cc(errs);
            if (results.affectedRows !== 1) return res.cc('修改失败，稍后再试');
            res.send({
                status: 0,
                msg: '已恢复'
            })
        })
    } else { //学生用户
        const sql_student = 'update user_students set status=0 where id=?';
        db.query(sql_student, req.body.id, (errs, results) => {
            if (errs) return res.cc(errs);
            if (results.affectedRows !== 1) return res.cc('修改失败，稍后再试');
            res.send({
                status: 0,
                msg: '已恢复'
            })
        })
    }
}