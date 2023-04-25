//存放管理员修改用户数据路由接口的回调函数
const db = require('../MySQL/mysql');
const configHost = require('../host/host');

//导入multiparty可以用来解析fromdata模式数据
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');

//增加修改老师用户数据回调函数
exports.updateTeacherHandler = (req, res) => {
    //表单验证通过后将修改与添加区分出来
    if (req.body.id < 0) { //添加
        console.log(req.body.id);
        const sqlHave = 'select * from user_teacher where username=?';
        const sqlHaveStudent = 'select * from user_students where student_number=?';
        //查看学生用户中是否有此用户名
        db.query(sqlHaveStudent, req.body.username, (errHaveStudent, resultHaveStudent) => {
            if (errHaveStudent) return res.cc(errHaveStudent);
            if (resultHaveStudent.length !== 0) return res.cc('用户账号已存在');
            //查看老师用户中是否已经有此用户
            db.query(sqlHave, req.body.username, (errHave, resultHave) => {
                if (errHave) return res.cc(errHave);
                if (resultHave.length !== 0) return res.cc('用户账号已存在');
                const sql = 'insert into user_teacher set ?';
                let newTeacher = {};
                for (const key in req.body) {
                    if (key !== 'id') {
                        newTeacher[key] = req.body[key]
                    }
                }
                // 将新老师用户添加到库中
                db.query(sql, newTeacher, (errUpdateTeacher, resultUpdateTeacher) => {
                    if (errUpdateTeacher) return res.cc(errUpdateTeacher);
                    if (resultUpdateTeacher.affectedRows !== 1) return res.cc('提交失败，稍后再试')
                    res.send({
                        status: 0,
                        msg: '添加成功'
                    })
                })
            })
        })
    } else { //修改数据
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
                // 修改数据库中的数据
                const sql_teacher = 'update user_teacher set ? where id=?';
                db.query(sql_teacher, [req.body, req.body.id], (errs, results) => {
                    if (errs) return res.cc(errs);
                    if (results.affectedRows !== 1) return res.cc('修改失败，稍后再试');
                    res.send({
                        status: 0,
                        data: req.body,
                        msg: '修改成功'
                    })
                })
            })
        })
    }
};

//删除学生用户接口路由回调函数
exports.deleteTeacherHandler = (req, res) => {
    const sql = 'update user_teacher set status = 1 where id=?';
    db.query(sql, req.query.id, (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc('删除失败，稍后再试');
        res.send({
            status: 0,
            msg: '删除成功'
        })
    })
}

//修改学生用户数据回调函数
exports.updateStudentHandler = (req, res) => {
    //由专业id获取专业对应名称
    const sqlGetTitle = 'select title from show_title where id=?'
    db.query(sqlGetTitle, req.body.domain_id, (errTitle, resultTitle) => {
        if (errTitle) return res.cc(errTitle);
        if (resultTitle.length !== 1) return res.cc('请求错误，稍后再试');
        let newStudent = { domain: resultTitle[0].title };
        for (const key in req.body) {
            if (key !== 'id') {
                newStudent[key] = req.body[key];
            }
        }
        const sqlHaveTeacher = 'select * from user_teacher where username=?'
        const sqlHaveStudent = 'select * from user_students where student_number=?'
        db.query(sqlHaveTeacher, newStudent.student_number, (errHaveTeacher, resultHaveTeacher) => {
            //查看老师用户中是否有此用户名
            if (errHaveTeacher) return res.cc(errHaveTeacher);
            if (resultHaveTeacher.length > 0) return res.cc('用户账号已存在');
            db.query(sqlHaveStudent, newStudent.student_number, (errHaveStudent, resultHaveStudent) => {
                //查看学生用户中是否有此用户名
                if (errHaveStudent) return res.cc(errHaveStudent);
                if (resultHaveStudent.length == 1 && resultHaveStudent[0].id !== req.body.id) return res.cc('用户账号已存在');
                const sql = 'update user_students set ? where id=?'
                db.query(sql, [newStudent, req.body.id], (err, result) => {
                    if (err) return res.cc(err);
                    if (result.affectedRows !== 1) return res.cc('请求出错，稍后再试')
                    res.send({
                        status: 0,
                        data: newStudent,
                        msg: '修改成功'
                    })
                })
            })
        })
    });

}

//添加学生用户数据回调函数
exports.setStudentHandler = (req, res) => {
    const sqlHaveTeacher = 'select * from user_teacher where username=?'
    db.query(sqlHaveTeacher, req.body.student_number, (errHaveTeacher, resultHaveTeacher) => {
        //查看老师用户中是否有此用户名
        if (errHaveTeacher) return res.cc(errHaveTeacher);
        if (resultHaveTeacher.length > 0) return res.cc('用户账号已存在');
        //查看学生用户中是否已有此用户
        const sql = 'select * from user_students where student_number=?'
        db.query(sql, [req.body.student_number], (err, result) => {
            if (err) return res.cc(err);
            if (result.length !== 0) return res.cc('用户账号已存在');
            const sqlSetStudent = 'insert into user_students set ?';
            db.query(sqlSetStudent, req.body, (errSetStudent, resultSetStudent) => {
                if (errSetStudent) return res.cc(errSetStudent);
                if (resultSetStudent.affectedRows !== 1) return res.cc('请求失败，稍后再试');
                res.send({
                    status: 0,
                    msg: '添加成功'
                })
            })
        })
    });
}

//删除学生用户接口路由回调函数
exports.deleteStudentHandler = (req, res) => {
    const sql = 'update user_students set status = 1 where id=?';
    db.query(sql, req.query.id, (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc('删除失败，稍后再试');
        res.send({
            status: 0,
            msg: '删除成功'
        })
    })
}

//图片上传接口回调
exports.getImgHandler = (req, res) => {
    var from = new multiparty.Form();
    from.parse(req, (err, fields, files) => {
        //获取文件上传的临时路径
        var tempPath = files.file[0].path;
        // //给上传的文件添加新名字
        let newname = files.file[0].originalFilename;
        // 规定文件格式
        const extname = path.extname(newname);
        if (extname == '.png' || extname == '.jpg' || extname == '.webp' || extname == '.bmp' || extname == '.jpeg' || extname == '.JPEG') {
            if (files.file[0].size < 10485760) {
                // // 给文件添加新路径
                let newPath = path.join(__dirname, "../fsImage/usersImage/") + newname;
                // //通过fs模块的rename方法 重新修改文件名
                fs.rename(tempPath, newPath, err => {
                    if (err) return res.cc('图片上传失败');
                    let url = `${configHost.hostServer}/api/usersImage/` + newname;
                    res.send({
                        status: 0,
                        msg: '图片上传成功',
                        url
                    })
                })
            } else {
                return res.cc('图片超过限制10M大小');
            }
        } else {
            return res.cc('照片格式不符合，只允许jpg|png|bmp|jpeg|JPG|JPEG格式')
        }
    })
}