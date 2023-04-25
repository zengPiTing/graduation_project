//服务器核心文件
const express = require('express');
//创建服务器实例
const app = express();
const configHost = require('./host/host');

//导入并配置cors中间件解决跨域问题
const cors = require('cors'); //导入中间件
app.use(cors()); //注册为全局中间件

//导入joi方便检查出表单错误
const Joi = require('joi');


// 通过如下的代码，配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件：
app.use(express.urlencoded({ extended: false }));
//导入并配置解析body数据的中间件
const bodyParser = require('body-parser');
app.use(bodyParser.json());


//注册err中间件，简化路由err时代码书写量
app.use((req, res, next) => {
    res.cc = (msg, status = 1) => {
        res.send({
            status,
            message: msg instanceof Error ? msg.message : msg
        });
    }
    next();
});

//在路由模块之前定义expressJWT中间件检验用户token
//导入密匙
const secretKey = require('./jwtkey/jwtkey');
const { expressjwt } = require('express-jwt');
app.use(expressjwt({
    secret: secretKey.jwtkey,
    algorithms: ["HS256"]
}).unless({ path: [/^\/api\//] }));

// ·······小程序接口路由······
//导入用户登录路由模块
const userRouter = require('./router/userRouter');
app.use('/api', userRouter);
//导入首页轮播图及热点新闻数据路由模块
const indexDataRouter = require('./router/indexDataRouter');
app.use('/api', indexDataRouter);
//导入老师获取用户信息路由模块
const getStudentRouter = require('./router/getStudent');
app.use('/teacher', getStudentRouter);
//导入用户修改密码路由模块
const updateRouter = require('./router/update');
app.use(updateRouter);
//导入导师展示页面数据路由模块
const showRouter = require('./router/getShow');
app.use('/api', showRouter);
//导入提交用户意向导师路由模块
const choiceRouter = require('./router/setChoice');
app.use('/choice', choiceRouter);
//导入获取用户申请记录路由模块
const recordRouter = require('./router/getRecord');
app.use(recordRouter);
//导入学生用户补充信息路由模块
const bindRouter = require('./router/setBind');
app.use('/bind', bindRouter);
//导入用户自定义头像路由模块
const setHeadphotoRouter = require('./router/setHeadphoto');
app.use(setHeadphotoRouter);
//导入用户提交反馈信息路由模块
const feedbackRouter = require('./router/setFeedback');
app.use(feedbackRouter);
//导入管理员获取数据路由模块
const managementRouter = require('./router/management');
app.use('/management', managementRouter);



// ·······管理后台接口·······
//导入管理员登录接口路由模块
const manageRouter = require('./backOfficeRouter/manageUserRouter');
app.use('/api', manageRouter);
//导入注册管理员用户修改密码路由模块
const manageUpdateRouter = require('./backOfficeRouter/manageUpdate');
app.use(manageUpdateRouter);
//导入管理员获取学院专业信息路由模块
const schoolTitleRouter = require('./backOfficeRouter/getSchoolTitle')
app.use(schoolTitleRouter);
//导入注册管理员获取所有用户信息数据的路由模块
const getUsersRouter = require('./backOfficeRouter/getUsers');
app.use('/users', getUsersRouter);
//导入注册管理员修改用户数据路由模块
const updateUsersRouter = require('./backOfficeRouter/updateUsers');
app.use(updateUsersRouter);
//导入注册热点新闻路由模块
const getHotNewsRouter = require('./backOfficeRouter/getHotNews');
app.use('/institute', getHotNewsRouter);
//优秀学生数据增删改查路由模块
const excellenceStudentRouter = require('./backOfficeRouter/excellenceStudent');
app.use('/excellence', excellenceStudentRouter);
//导师学生配置界面数据路由模块
const mappingRouter = require('./backOfficeRouter/mapping');
app.use('/mapping', mappingRouter);
//反馈信息界面数据路由模块
const feedbackRouterMessage = require('./backOfficeRouter/feedback');
app.use('/feedback', feedbackRouterMessage);
//获取所有用户信息数据路由模块
const stUsersRouter = require('./backOfficeRouter/stUsers');
app.use(stUsersRouter);

//暴露出图片文件
app.use('/api', express.static("./fsImage"));

// 配置全局错误中间件,捕获请求过程中的错误
app.use((err, req, res, next) => {
    //验证表单数据出现错误
    if (err instanceof Joi.ValidationError) return res.cc(err);
    //token验证出错
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败,请重新登录');
    // 未知错误
    res.cc(err);
    next();
})

//启动服务器
app.listen(1104, () => {
    console.log(`${configHost.hostServer}`);
});