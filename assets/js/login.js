$(function () {
    // 需求一：点击注册按钮，显示注册页面，隐藏登录页面
    $('#reg_link').on('click', function () {
        $('.reg_box').show();
        $('.login_box').hide();
    });
    // 相反
    $('#login_link').on('click', function () {
        $('.reg_box').hide();
        $('.login_box').show();
    });

    // 需求二：导入layui 自定义校验规则
    // 用一个变量保存form
    let form = layui.form;
    // console.log(form);
    // verify()的参数是一个对象
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function (value, item) {
            // value 代表的是再次输入密码的数字
            // item是获取到再次输入密码里面的值
            // console.log($('.reg_box input[name=password]').val());
            // console.log(value);
            let pwd = $('.reg_box input[name=password]').val()
            if (value != pwd) {
                return "两次输入的密码不正确";
            }
        }
    });


    // 需求三：ajax注册用户
    let layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $('.reg_box input[name=username]').val(),
                password: $('.reg_box input[name=password]').val(),
            },
            success: (res) => {
                // console.log(res);
                // 错误提示
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                layer.msg('恭喜您，注册成功', { icon: 6 });
                document.querySelector('#form_reg').reset();
                $('#login_link').click();
            }
        })
    })

    // 需求四：登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                // 错误提示
                if (res.status != 0) {
                    return layer.msg('密码或用户名有误', { icon: 5 })
                }
                // 登录成功
                layer.msg('恭喜您，登录成功');
                // 保存token
                localStorage.setItem('mytoken', res.token);
                // 跳转
                location.href = '/index.html';
            }
        })
    })
});