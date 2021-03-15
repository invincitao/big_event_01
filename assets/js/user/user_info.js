// 入口函数
$(function () {
    // 1.校验规则定义
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            // 控制不能
            if (value.trim().length < 2 || value.trim().length > 6) {
                return '用户昵称必须是在2-6位之间'
            }
        }
    });
    // 2.用户渲染
    let layer = layui.layer;
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                // 成功就渲染
                form.val('formUserInfo', res.data);
            }
        })
    }
    // 3.清空列表
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        // 重新渲染
        initUserInfo();
    })
    // 4.提交
    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                layer.msg('恭喜您，用户信息修改成功');
                // 成功后就渲染
                // 通过本页面window，找父页面的window，
                // 然后再父页面找出挂载的getUserInfo的方法
                window.parent.getUserInfo();
            }
        })
    })
})
