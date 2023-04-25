//用户反馈信息界面路由回调函数
const db = require('../MySQL/mysql');

exports.getMessage_handler = (req, res) => {
    const sql = 'select * from feedback where status=0';
    db.query(sql, (err, result) => {
        if (err) return res.cc(err);
        if (result.length < 1) return res.cc('暂无反馈内容');
        res.send({
            status: 0,
            msg: '请求成功',
            data: result
        })
    })
};

//删除用户反馈信息
exports.deleteMessage_Handler = (req, res) => {
    const sql = 'update feedback set status = 1 where id=?';
    db.query(sql, req.query.id, (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc('删除失败，稍后再试');
        res.send({
            status: 0,
            msg: '删除成功'
        })
    })
};