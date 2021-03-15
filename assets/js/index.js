// 入口函数
$(function () {

    // 1.获取用户信息
    getUserInfo();
    // 2.退出登录,回到登陆页面，清除token
    $('#btnLoginout').on('click', function () {
        layer.confirm('是否确认退出？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('mytoken');
            location.href = '/login.html'
            layer.close(index);
        });
    })
});
// 封装需要放到入口函数外边
// 原因:方便后边调用此方法
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'GET',
        // ---------------------
        // headers: {
        //     Authorization: localStorage.getItem('mytoken') || ''
        // },
        // 登录拦截
        // complete: function (res) {
        //     console.log(res);
        //     let obj = res.responseJSON;
        //     if (obj.status == 1 && obj.message == '身份认证失败！') {
        //         localStorage.removeItem('mytoken');
        //         location.href = '/login.html';
        //     }
        // },
        // --------------------------
        // 上面的代码写在了baseAPI.js里边
        data: {},
        success: (res) => {
            if (res.status != 0) {
                return layui.layer.msg(res.message, { icon: 5 })
            }
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(user) {
    // console.log(user);
    // 1.获取名字,进行渲染
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎光临&nbsp;' + name);
    if (user.user_pic != null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        // 没有头像
        $('.layui-nav-img').hide();
        let text = name[0].toUpperCase();
        $('.text-avatar').show().html(text)
    }
}


