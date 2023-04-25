//用于管理所有的接口api文件
import requests from './requests';

//登录接口/api/manageLogin,参数data={possword,username,isTeacher}
export const loginUsers = data => requests({ url: '/api/manageLogin', method: 'POST', data });

//修改密码接口/manageUpdate,参数data={ id, isTeacher, oldPassword, newPassword }
export const update = data => requests({ url: '/manageUpdate', method: 'POST', data });

//获取学院所有专业的接口/getSchool,无参数
export const headerTitle = () => requests({ url: '/getSchool', method: 'GET' });

//根据学院专业及用户类别获取所有用户接口/users/Message
export const getUsershandler = data => requests({ url: '/users/Message', method: 'POST', data });

//修改老师用户数据接口/updateUser/teacher,
// 参数data={nickname: "", username: "", password: "111111", email: "", school: "智能科学与工程", domain: "", isManager: "", awards: "", education: "", epr: "", teacherClass: "", isTeacher: 0,}
export const updateTeacherHandler = data => requests({ url: '/updateUser/teacher', method: 'POST', data });

//删除老师用户数据接口/delete/teacher,参数：id:""
export const deleteTeacherHandler = id => requests({ url: `/delete/teacher?id=${id}`, method: 'GET' });

//修改学生用户数据接口/updateUsers/student,
//参数 data={id:"",nickname: "",student_number: "",password: "",student_phone: "",school: "",student_dorm: "",_class: "",minzu: "",jiguan: "",date: "",date_birth:"",domain_id: "",isManager: "",}
export const updateStudentHandler = data => requests({ url: '/updateUsers/student', method: 'POST', data });

//添加学生用户数据接口/setUsers/student,
// 参数 data={nickname: "",student_number: "",password: "",isManager: "",isTeacher:1}
export const setStudentHandler = data => requests({ url: '/setUsers/student', method: 'POST', data });

//删除学生用户数据接口/delete/teacher,参数：id:""
export const deleteStudentHandler = id => requests({ url: `/delete/student?id=${id}`, method: 'GET' });

//获取热点新闻数据接口/institute/getHotNews,无参数
export const getHotHandler = () => requests({ url: '/institute/getHotNews', method: 'GET' });

//修改新闻热点数据接口/institute/updateHotNew,参数：data={id:"",title:"",text_img:""}
// export const updateHotHandler = data => requests({ url: '/institute/updateHotNew', method: 'POST', data });

// 添加热点新闻数据接口/institute/setHotNew,参数：data={title:"",text_img:""}
// export const setHotNewHandler = data => requests({ url: '/institute/setHotNew', method: 'POST', data });

//删除热点新闻数据接口/institute/deleteNew,参数：id="";
export const deleteNewHandler = (id) => requests({ url: `/institute/deleteNew?id=${id}`, method: 'GET' });

//修改专业数据接口/institute/updateSchool,参数：data={id:"",school:"",title}
export const updateSchoolHandler = data => requests({ url: '/institute/updateSchool', method: 'POST', data });

//添加专业数据接口/institute/setSchool,参数：data={school:"",title}
export const setSchoolHandler = data => requests({ url: '/institute/setSchool', method: 'POST', data });

//删除专业数据接口/institute/deleteSchool,参数：id:""
export const deleteSchoolHandler = id => requests({ url: `/institute/deleteSchool?id=${id}`, method: 'GET' });

//恢复专业数据接口/institute/recoverDomain,参数：id
export const recoverDomainHandler = id => requests({ url: `/institute/recoverDomain?id=${id}`, method: 'GET' });

//获取优秀学生数据接口/excellence/getStudent,参数：无
export const getExcellenceStudentHandler = () => requests({ url: '/excellence/getStudent', method: 'GET' });

//修改优秀学生数据接口/excellence/updateStudent,参数：data ={id: "",name: "",title: "",text: ""}
// export const updateExcellenceStudentHandler = data => requests({ url: '/excellence/updateStudent', method: 'POST', data });

//添加优秀学生数据接口/excellence/setStudent,参数：data ={name: "",title: "",text: ""}
// export const setExcellenceStudentHandler = data => requests({ url: '/excellence/setStudent', method: 'POST', data });

//删除优秀学生数据接口/excellence/deleteStudent,参数：id:""
export const deleteExcellenceStudentHandler = id => requests({ url: `/excellence/deleteStudent?id=${id}`, method: 'GET' });

//获取当前专业所有老师级学生/mapping/getEveryUsers,参数：id:""
export const getEveryUsersHandler = id => requests({ url: `/mapping/getEveryUsers?id=${id}`, method: 'GET' });

//解散师生匹配关系/mapping/updateChoice,参数:id={id:"",teacher_id:""}
export const updateChoiceHandler = data => requests({ url: '/mapping/updateChoice', method: 'POST', data });

//获取用户反馈信息接口/feedback/getMessage,参数：无
export const getFeedbackHandler = () => requests({ url: '/feedback/getMessage', method: 'GET' });

//删除用户反馈信息数据接口/feedback/deleteMessage,参数：id:""
export const deleteFeedbackHandler = id => requests({ url: `/feedback/deleteMessage?id=${id}`, method: 'GET' });

//获取所有用户的信息接口/stUsers
export const stUsersHandler = () => requests({ url: '/stUsers', method: 'GET' });

//获取所有用户申请审批记录接口/getRecord
export const getRecordHandler = () => requests({ url: '/getRecord', method: 'GET' });

//修改用户账号信息接口/updateUserMessage,参数用户信息
export const updateUserMessageHandler = data => requests({ url: '/updateUserMessage', method: 'POST', data });

//恢复用户账号信息接口/recoverUserMessage,参数用户信息
export const recoverUserMessageHandler = data => requests({ url: '/recoverUserMessage', method: 'POST', data });