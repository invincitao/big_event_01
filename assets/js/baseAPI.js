// 开发环境服务器地址
let baseURL = "http://api-breakingnews-web.itheima.net";
// 测试环境服务器地址
// let baseURL = "http://api-breakingnews-web.itheima.net";
// 生产环境服务器地址
// let baseURL = "http://api-breakingnews-web.itheima.net";

// 拦截ajax请求
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    // 拼接对应服务器环境
    options.url = baseURL + options.url;
})