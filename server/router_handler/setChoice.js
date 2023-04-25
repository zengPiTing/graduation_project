//用户提交导师意向路由模块的回调函数

//导入数据库模块
const db = require('../MySQL/mysql');


//学生用户提交申请回调函数
exports.setChoice_handler = (req, res) => {
    let { submit_time, daoshi_name, id, student_name, studentRemark } = req.body;
    //在表单验证通过后查看当前用户是否已有导师或者有申请在审核中
    const teacherSql = 'select * from user_teacher where nickname=?'
    const isSql = 'select * from user_students where id=?';
    const sql = 'update user_students set is_choice=?,submit_time=?,studentRemark=? where id=?';
    //查看是否有此老师
    db.query(teacherSql, daoshi_name, (errTeacher, resultTeacher) => {
        if (errTeacher) return res.cc(errTeacher);
        if (resultTeacher.length < 1) return res.cc('暂无此老师，请重新选择');
        //查看是否在审核中或者已经有导师
        db.query(isSql, id, (err, result) => {
            if (err) return res.cc(err);
            if (result.length !== 1) return res.cc('请求失败，稍后再试');
            if (result[0].is_choice) return res.cc('有申请在审核中，请稍后再试');
            if (result[0].daoshi_id || result[0].daoshi_name) return res.cc('已有导师，请勿重复选择');
            //提交审核
            db.query(sql, [daoshi_name, submit_time, studentRemark, id], (errs, results) => {
                if (errs) return res.cc(errs);
                if (results.affectedRows !== 1) return res.cc('提交失败，稍后再试');
                res.send({
                    status: 0,
                    msg: '提交成功，待老师审核'
                });
                //保存申请记录
                const sql_record = 'insert into record set ?';
                let record_demo = { teacher_name: daoshi_name, submit_time, student_id: id, student_name, studentRemark };
                db.query(sql_record, record_demo, (errss, resultss) => {
                    if (errss) return res.cc(errss);
                    if (resultss.affectedRows !== 1) return res.cc('存储记录失败');
                })
            })
        })
    })
}

//老师用户获取申请学生信息
exports.getChoiceStudentList_handler = (req, res) => {
    //表单数据验证完成之后将所有申请用户都请求出来返回给客户端
    const sql = 'select * from user_students where is_choice=?';
    db.query(sql, req.body.is_choice, (err, result) => {
        if (err) return res.cc(err);
        if (result.length < 1) return res.cc('暂无学生申请');
        res.send({
            status: 0,
            msg: '请求成功',
            data: result
        })
    })
}

//老师审阅学生申请回调函数
exports.setChoiseApply_handler = (req, res) => {
    //表单验证通过后将修改数据库数据
    const { is_yes, comment, id, daoshi_name, daoshi_id, reject_time, submit_time } = req.body;
    if (is_yes == 'yes') {
        let choiceDeme = { is_choice: '', comment, daoshi_id, daoshi_name }
        const sql = 'update user_students set ? where id=? ';
        const sql_record = 'update record set ? where submit_time=? and student_id=?';
        db.query(sql, [choiceDeme, id], (err, result) => {
            if (err) return res.cc(err);
            if (result.affectedRows !== 1) return res.cc('提交失败，请稍后再试');
            res.send({
                status: 0,
                msg: '已成功添加学生'
            });
            let record_demo = { is_yes, reject_time, teacher_id: daoshi_id, comment };
            db.query(sql_record, [record_demo, submit_time, id], (errs, results) => {
                if (errs) return res.cc(errs);
                if (results.affectedRows !== 1) return res.cc('数据存储失败');
            })
        })
    } else {
        let choiceDemeNo = { is_choice: null, comment: null, daoshi_id: null, daoshi_name: null };
        const sql_record = 'update record set ? where submit_time=? and student_id=?';
        const sql = 'update user_students set ? where id=? ';
        db.query(sql, [choiceDemeNo, id], (errs, results) => {
            if (errs) return res.cc(errs);
            if (results.affectedRows !== 1) return res.cc('提交失败，请稍后再试');
            res.send({
                status: 0,
                msg: '已成功驳回'
            });
            let record_demo = { is_yes, reject_time, teacher_id: daoshi_id, comment };
            db.query(sql_record, [record_demo, submit_time, id], (errs, results) => {
                if (errs) return res.cc(errs);
                if (results.affectedRows !== 1) return res.cc('数据存储失败');
            })
        })
    }
}