// 存放优秀学生路由回调函数

const db = require('../MySQL/mysql')
const configHost = require('../host/host');

//导入multiparty可以用来解析fromdata模式数据
const multiparty = require('multiparty')
const fs = require('fs');
const path = require('path');

//获取优秀学生接口回调
exports.getExcellenceStudent = (req, res) => {
    const sql = 'select * from examplestudent where status=0'
    db.query(sql, (err, result) => {
        if (err) return res.cc(err);
        if (result.length < 1) return res.cc('暂无优秀学生');
        res.send({
            status: 0,
            msg: '请求成功',
            data: result
        })
    })
};

//修改添加优秀学生数据回调
exports.updateExcellenceStudent = (req, res) => {
    var from = new multiparty.Form();
    from.parse(req, (err, fields, files) => {
        //获取文件上传的临时路径
        var tempPath = files.file[0].path;
        //上传的文件名，给上传的文件添加新名字
        let newname = files.file[0].originalFilename;
        // 规定文件格式
        const extname = path.extname(newname);
        if (extname == '.png' || extname == '.jpg' || extname == '.webp' || extname == '.bmp' || extname == '.jpeg' || extname == '.JPEG') {
            if (files.file[0].size < 10485760) {
                // 给文件添加新路径
                let newPath = path.join(__dirname, "../fsImage/mienStudentImage/") + newname;
                //通过fs模块的rename方法 重新修改文件名
                fs.rename(tempPath, newPath, err => {
                    if (err) return res.cc('图片上传失败');
                    let url = `${configHost.hostServer}/api/mienStudentImage/` + newname;
                    // console.log(fields);
                    let name = fields.name[0];
                    let title = fields.title[0];
                    let text = fields.text[0];
                    let uploadData = { name, title, text, url }
                    if (fields.id) { //修改
                        let id = fields.id[0];
                        const sql = 'update examplestudent set ? where id=?'
                        db.query(sql, [uploadData, id], (err, result) => {
                            if (err) return res.cc(err);
                            if (result.affectedRows !== 1) return res.cc('修改失败，稍后再试');
                            res.send({
                                status: 0,
                                msg: '修改成功',
                                url
                            })
                        })
                    } else { //添加优秀学生
                        const sqlHave = 'select * from examplestudent where title=? and status=0';
                        db.query(sqlHave, title, (errHave, resultHave) => {
                            if (errHave) return res.cc(errHave);
                            if (resultHave.length > 0) return res.cc('此文章标题已被占用，请查看此文章是否已上传');
                            const sql = 'insert into examplestudent set ?';
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

//添加优秀学生数据回调
exports.setExcellenceStudent = (req, res) => {
    const sqlHave = 'select * from examplestudent where title=?';
    db.query(sqlHave, req.body.title, (errHave, resultHave) => {
        if (errHave) return res.cc(errHave);
        if (resultHave.length > 0) return res.cc('此文章标题已被占用，请查看此文章是否已上传');
        const sql = 'insert into examplestudent set ?';
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

//删除优秀学生数据接口回调
exports.deleteExcellenceStudent = (req, res) => {
    const sql = 'update examplestudent set status = 1 where id=?';
    db.query(sql, req.query.id, (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc('删除失败，稍后再试');
        res.send({
            status: 0,
            msg: '删除成功'
        })
    })
};