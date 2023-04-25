//反馈意见路由的回调函数

const db = require('../MySQL/mysql');
const configHost = require('../host/host');
//导入multiparty可以用来解析fromdata模式数据
const multiparty = require('multiparty')
const fs = require('fs');
const path = require('path');

//上传反馈信息
exports.setFeedback_handler = (req, res) => {
    var from = new multiparty.Form();
    from.parse(req, (err, fields, files) => {
        //获取文件上传的临时路径
        var tempPath = files.file[0].path;
        // console.log(files);
        // console.log(fields);
        //给上传的文件添加新名字
        let newname = files.file[0].originalFilename;
        // 规定文件格式
        const extname = path.extname(newname);
        if (extname == '.png' || extname == '.jpg' || extname == '.webp' || extname == '.bmp' || extname == '.jpeg' || extname == '.JPEG') {
            if (files.file[0].size < 10485760) {
                // 给文件添加新路径
                let newPath = path.join(__dirname, "../fsImage/feedbackImage/") + newname;
                //通过fs模块的rename方法 重新修改文件名
                fs.rename(tempPath, newPath, err => {
                    if (err) return res.cc('上传失败');
                    let url = `${configHost.hostServer}/api/feedbackImage/` + newname;
                    let name = fields.name[0];
                    let phone = fields.phone[0];
                    let feedback_content = fields.feedback_content[0];
                    let time = fields.time[0];
                    let feedbackData = { time, name, phone, feedback_content, photo: url }
                    const sql = 'insert into feedback set?';
                    db.query(sql, feedbackData, (errFeedback, result) => {
                        if (errFeedback) return res.cc(errFeedback);
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