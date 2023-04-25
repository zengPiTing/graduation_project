// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//     transpileDependencies: true,// node_modules里的依赖默认是不会编译的,会导致es6语法在ie中的语法报错,所以需要在vue.config.js中使用transpileDependencies属性配置node_modules中指定哪些文件夹或文件需要编译.
//     lintOnSave: false, //关闭不必要的报错
// }, {
//     devServer: { //自定义启动项目端口号
//         port: 1104
//     }
// })
module.exports = {
    devServer: { //自定义启动项目端口号
        port: 1104
    },
    lintOnSave: false, //关闭不必要的报错
    transpileDependencies: true
}