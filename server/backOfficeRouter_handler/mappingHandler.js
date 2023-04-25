//存放导师学生意向管理路由接口回调函数

const db = require('../MySQL/mysql');

//获取所有用户接口回调
exports.getEveryUsers_handler = (req, res) => {
    const sqlTeacher = 'select * from user_teacher where domain_id=? and status=0';
    const sqlStudent = 'select * from user_students where status=0';
    db.query(sqlStudent, (errStudent, resultStudent) => {
        if (errStudent) return res.cc(errStudent);
        if (resultStudent.length < 0) return res.cc('请求出错');
        let student = resultStudent;
        db.query(sqlTeacher, req.query.id, (errTeacher, resultTeacher) => {
            if (errTeacher) return res.cc(errTeacher);
            if (resultTeacher.length < 0) return res.cc('请求出错');
            let teacher = resultTeacher;
            if (student && teacher) {
                res.send({
                    status: 0,
                    msg: '请求成功',
                    data: { student, teacher }
                });
            } else {
                res.cc('请求失败')
            }
        });
    });
};

//解除师生匹配关系接口回调
exports.updateChoice_Handler = (req, res) => {
    //修改学生匹配数据
    const sqlStudent = 'update user_students set ? where id=?';
    let studentMessage = { daoshi_id: null, daoshi_name: '', comment: '', studentRemark: '' };
    db.query(sqlStudent, [studentMessage, req.body.id], (errStudent, resultStudent) => {
        if (errStudent) return res.cc(errStudent);
        if (resultStudent.affectedRows !== 1) return res.cc('解除失败');
        // 清除匹配记录
        const sqlRecord = 'update record set ? where student_id=? and teacher_id=? and is_yes=?';
        let recordMessage = { is_yes: 'no', comment: '已被管理员解除匹配' }
        db.query(sqlRecord, [recordMessage, req.body.id, req.body.teacher_id, 'yes'], (err, result) => {
            if (err) return res.cc(err);
            if (result.affectedRows !== 1) return res.cc('清除失败，稍后再试');
            res.send({
                status: 0,
                msg: '解除成功'
            })
        })
    })
}