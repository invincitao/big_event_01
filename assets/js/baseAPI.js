// 开发环境服务器地址
let baseURL = "http://api-breakingnews-web.itheima.net";
// 测试环境服务器地址
// let baseURL = "http://api-breakingnews-web.itheima.net";
// 生产环境服务器地址
// let baseURL = "http://api-breakingnews-web.itheima.net";

// 拦截ajax请求
$.ajaxPrefilter(function (options) {

    // 1.如果是index.html页面，不需要添加前缀
    if (options.url === 'http://127.0.0.1:5500/index.html') {
        return;
    }
    // console.log(options.url);
    // 拼接对应服务器环境
    options.url = baseURL + options.url;
    // 2.身份认证,每个带my的接口都要用到，所以就简化一下代码
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('mytoken') || ''
        }
    };
    // 登录拦截(拦截所有登录，判断身份认证信息)
    options.complete = function (res) {
        // console.log(res);
        let obj = res.responseJSON;
        // 认证失败就清空token，跳转到登录页
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            localStorage.removeItem('mytoken');
            location.href = '/login.html';
        }
    };
})