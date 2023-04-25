//管理员获取后台学院专业信息路由模块回调

const db = require('../MySQL/mysql')

//获取专业信息
exports.getSchoolTitleHandler = (req, res) => {
    const sql = 'select * from show_title';
    db.query(sql, (err, result) => {
        if (err) return res.cc(err);
        if (result.length < 1) return res.cc('请求失败，稍后再试');
        res.send({
            status: 0,
            msg: '请求成功',
            data: result
        })
    })

}