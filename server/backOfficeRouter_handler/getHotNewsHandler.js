//存放热点新闻路由模块的回调函数
const db = require('../MySQL/mysql')
const configHost = require('../host/host');

//导入multiparty可以用来解析fromdata模式数据
const multiparty = require('multiparty')
const fs = require('fs');
const path = require('path');

//获取热点新闻路由接口回调函数
exports.getHotNewsHandler = (req, res) => {
    const sql = 'select * from hotspot where status=0'
    db.query(sql, (err, result) => {
        if (err) return res.cc(err);
        if (result.length < 1) return res.cc('暂无热点新闻');
        res.send({
            status: 0,
            msg: '请求成功',
            data: result
        })
    })
}

//添加修改热点新闻路由接口回调函数
exports.updateHotNewHandler = (req, res) => {
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
                let newPath = path.join(__dirname, "../fsImage/hotNewsImage/") + newname;
                // //通过fs模块的rename方法 重新修改文件名
                fs.rename(tempPath, newPath, err => {
                    if (err) return res.cc('图片上传失败');
                    let url = `${configHost.hostServer}/api/hotNewsImage/` + newname;
                    let title = fields.title[0];
                    let img_text = fields.img_text[0];
                    let uploadData = { title, img_text, url }
                    if (fields.id) { //修改热点新闻
                        let id = fields.id[0];
                        const sqlHave = 'select * from hotspot where title=? and status=0';
                        db.query(sqlHave, title, (errHave, resultHave) => {
                            if (errHave) return res.cc(errHave);
                            if (resultHave.length > 1) return res.cc('此文章标题已被占用，请查看此文章是否已上传');
                            const sql = 'update hotspot set ? where id=?'
                            db.query(sql, [uploadData, id], (err, result) => {
                                if (err) return res.cc(err);
                                if (result.affectedRows !== 1) return res.cc('修改失败，稍后再试');
                                res.send({
                                    status: 0,
                                    msg: '修改成功',
                                    url
                                })
                            })
                        })
                    } else { //添加热点新闻
                        const sqlHave = 'select * from hotspot where title=? and status=0';
                        db.query(sqlHave, title, (errHave, resultHave) => {
                            if (errHave) return res.cc(errHave);
                            if (resultHave.length > 0) return res.cc('此文章标题已被占用，请查看此文章是否已上传');
                            const sql = 'insert into hotspot set ?';
                            db.query(sql, uploadData, (err, result) => {
                                if (err) return res.cc('err');
                                if (result.affectedRows !== 1) res.cc('添加失败，稍后再试');
                                res.send({
                                    status: 0,
                                    msg: '添加成功'
                                })
                            })
                        })
                    }
                })
            } else {
                return res.cc('图片超过限制10M大小');
            }
        } else {
            return res.cc('照片格式不符合，只允许jpg|png|bmp|jpeg|JPG|JPEG格式')
        }
    })
};

//删除热点新闻数据接口回调
exports.deleteHotNewHandler = (req, res) => {
    const sql = 'update hotspot set status = 1 where id=?';
    db.query(sql, req.query.id, (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc('删除失败，稍后再试');
        res.send({
            status: 0,
            msg: '删除成功'
        })
    })
};

//修改专业数据路由接口回调函数
exports.updateSchoolHandler = (req, res) => {
    const sqlHave = 'select * from show_title where title=?';
    db.query(sqlHave, req.body.title, (errHave, resultHave) => {
        if (errHave) return res.cc(errHave);
        if (resultHave.length > 0) return res.cc('此专业名已被占用');
        const sql = 'update show_title set ? where id=?'
        db.query(sql, [req.body, req.body.id], (err, result) => {
            if (err) return res.cc(err);
            if (result.affectedRows !== 1) return res.cc('修改失败，稍后再试');
            res.send({
                status: 0,
                msg: '修改成功'
            })
        })
    })
};

//添加专业数据数据接口回调函数
exports.setSchoolHandler = (req, res) => {
    const sqlHave = 'select * from show_title where title=?';
    db.query(sqlHave, req.body.title, (errHave, resultHave) => {
        if (errHave) return res.cc(errHave);
        if (resultHave.length > 0) return res.cc('此专业名已被占用');
        const sql = 'insert into show_title set ?';
        db.query(sql, req.body, (err, result) => {
            if (err) return res.cc('err');
            if (result.affectedRows !== 1) res.cc('添加失败，稍后再试');
            res.send({
                status: 0,
                msg: '添加成功'
            })
        })
    })
};

//删除专业数据接口回调
exports.deleteSchoolHandler = (req, res) => {
    //首先判断此专业是否还有学生老师可用，如果可用，让其无法删除
    const sqlTeacher = 'select * from user_teacher where domain_id=?'
    const sqlStudent = 'select * from user_students where domain_id=?'
    db.query(sqlTeacher, req.query.id, (errTeacher, resultTeacher) => {
        if (errTeacher) return res.cc(errTeacher);
        if (resultTeacher.length !== 0) return res.cc('当前专业还有专业老师，无法删除');
        db.query(sqlStudent, req.query.id, (errStudent, resultStudent) => {
            if (errStudent) return res.cc(errStudent);
            if (resultStudent.length !== 0) return res.cc('当前专业还有专业学生，无法删除');
            const sql = 'update show_title set status = 1 where id=?';
            db.query(sql, req.query.id, (err, result) => {
                if (err) return res.cc(err);
                if (result.affectedRows !== 1) return res.cc('删除失败，稍后再试');
                res.send({
                    status: 0,
                    msg: '删除成功'
                })
            })
        })
    })
};
//恢复专业数据接口回调
exports.recoverDomainHandler = (req, res) => {
    const sql = 'update show_title set status = 0 where id=?';
    db.query(sql, req.query.id, (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc('恢复失败，稍后再试');
        res.send({
            status: 0,
            msg: '恢复成功'
        })
    })
}