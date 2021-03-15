$(function () {
    // 自定义规则
    // 1.密码设定
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '不能与原密码一致'
            }
        },
        rePwd: function (value) {
            if (value != $('[name=newPwd]').val()) {
                return '两次新密码输入不一致'
            }
        }
    })

    // 重置密码提交，更新
    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 });
                }
                layui.layer.msg('密码重置成功', { icon: 6 })
                $('form')[0].reset();
                // 改完密码就直接到登录页面
                location.href = '/login.html';
            }
        })
    })

})
