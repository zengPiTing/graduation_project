//首页数据路由执行回调模块
//导入MySQL模块
const db = require('../MySQL/mysql')

exports.indexData_handler = (req, res) => {
    //热点新闻数据请求
    const sql_hot = 'select * from hotspot where status=0'
    db.query(sql_hot, (errhot, resultshot) => {
        if (errhot) return res.cc(errhot);
        let indexHot = resultshot;
        // 导师数据请求
        const sql_daoshi = 'select * from user_teacher where status=0'
        db.query(sql_daoshi, (errTeacher, resultsTeacher) => {
            if (errTeacher) return res.cc(errTeacher);
            //清除老师用户的密码
            let teacherResults = resultsTeacher.map((item) => {
                item.password = '';
                return item;
            })
            let indexDaoshi = teacherResults;
            // 首页优秀学生数据请求
            const sql_student = 'select *from examplestudent where status=0'
            db.query(sql_student, (errStudent, resultsStudent) => {
                if (errStudent) return res.cc(errStudent);
                let indexStudent = resultsStudent;
                res.send({
                    status: 0,
                    msg: '请求成功',
                    data: {
                        indexHot,
                        indexDaoshi,
                        indexStudent
                    }
                })
            });
        });
    });
}