//用户绑定信息路由回调
const db = require('../MySQL/mysql');
const configHost = require('../host/host');

//导入multiparty可以用来解析fromdata模式数据
const multiparty = require('multiparty')
const fs = require('fs');
const path = require('path');

//用户绑定身份路由回调函数
exports.bindUsers_handler = (req, res) => {
    //表单验证通过后将数据添加到数据库中
    const {
        student_phone,
        school,
        domain,
        _class,
        enrol_year,
        student_dorm,
        date_birth,
        id,
        minzu,
        jiguan
    } = req.body;
    const sqlDomain = 'select id from show_title where title=? and status=0';
    db.query(sqlDomain, domain, (errDomain, resultDomain) => {
        if (errDomain) return res.cc(errDomain);
        if (resultDomain.length < 1) return res.cc('绑定失败，请稍后再试');
        let users = { student_phone, school, domain, _class, enrol_year, student_dorm, date_birth, minzu, jiguan, domain_id: resultDomain[0].id }
        const sql = 'update user_students set? where id=?';
        db.query(sql, [users, id], (err, result) => {
            if (err) return res.cc(err);
            if (result.affectedRows !== 1) return res.cc('绑定失败，请稍后再试');
            res.send({
                status: 0,
                msg: '绑定成功'
            })
        })
    })
};

//用户上传图片回调函数
exports.setHeadphotoHandler = (req, res) => {
    var from = new multiparty.Form();
    from.parse(req, (err, fields, files) => {
        // req:前端传的值
        // fields:{},fromDate传递的参数
        // files:前端传过来的参数
        //获取文件上传的临时路径
        var tempPath = files.file[0].path;
        //给上传的文件添加新名字
        let newname = files.file[0].originalFilename;
        // 规定文件格式
        const extname = path.extname(newname);
        if (extname == '.png' || extname == '.jpg' || extname == '.webp' || extname == '.bmp' || extname == '.jpeg' || extname == '.JPEG') {
            if (files.file[0].size < 10485760) {
                // 给文件添加新路径
                let newPath = path.join(__dirname, "../fsImage/usersImage/") + newname;
                //通过fs模块的rename方法 重新修改文件名
                fs.rename(tempPath, newPath, err => {
                    if (err) return res.cc('上传失败');
                    let url = `${configHost.hostServer}/api/usersImage/` + newname;
                    let id = fields.id[0];
                    const sql = 'update user_students set photo=? where id=?';
                    db.query(sql, [url, id], (err, result) => {
                        if (err) return res.cc(err);
                        if (result.affectedRows !== 1) return res.cc('头像上传失败，稍后再试');
                        res.send({
                            status: 0,
                            url,
                            msg: '头像上传成功'
                        })
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

//用户获取自身信息路由回调函数
exports.getUsers_handler = (req, res) => {
    const sql = 'select * from user_students where id=?';
    db.query(sql, req.query.id, (err, result) => {
        if (err) return res.cc(err);
        if (result.length != 1) return res.cc('请求失败，稍后再试');
        result[0].password = ''
        res.send({
            status: 0,
            msg: '请求成功',
            data: result
        })
    })
}